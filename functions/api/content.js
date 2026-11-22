const CLOUD_KV_URL = "https://kvdb.io/9ZpQz9PsoPRmsWkoyeatxz/site_content";

export async function onRequestGet(context) {
  try {
    // 1. If Cloudflare native KV is bound, check it first
    if (context.env && context.env.NEOGEN_KV) {
      const data = await context.env.NEOGEN_KV.get("site_content");
      if (data) {
        return new Response(data, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache, no-store, must-revalidate"
          }
        });
      }
    }

    // 2. Fetch from persistent cloud KV (works universally across phones and computers)
    try {
      const cloudRes = await fetch(CLOUD_KV_URL, {
        headers: { "Cache-Control": "no-cache" }
      });
      if (cloudRes.ok) {
        const text = await cloudRes.text();
        if (text && text.trim().startsWith('{')) {
          return new Response(text, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache, no-store, must-revalidate"
            }
          });
        }
      }
    } catch (e) {}

    // 3. Fallback to static asset site_content.json from repo
    const url = new URL(context.request.url);
    url.pathname = "/site_content.json";
    return context.env.ASSETS.fetch(new Request(url.toString(), context.request));
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const now = Date.now();
    body._updatedAt = now;
    body._serverUpdatedAt = now;
    const bodyStr = JSON.stringify(body, null, 2);

    let savedKv = false;
    let savedCloud = false;

    // 1. Save to native Cloudflare KV if bound
    if (context.env && context.env.NEOGEN_KV) {
      try {
        await context.env.NEOGEN_KV.put("site_content", bodyStr);
        savedKv = true;
      } catch (e) {}
    }

    // 2. Save to persistent Cloud KV (propagates globally to all phones and devices)
    try {
      const cloudPost = await fetch(CLOUD_KV_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyStr
      });
      if (cloudPost.ok) savedCloud = true;
    } catch (e) {}

    return new Response(JSON.stringify({
      success: true,
      persisted: savedKv ? "native_kv" : (savedCloud ? "cloud_kv" : "client"),
      updatedAt: now,
      count: Object.keys(body).length
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
