export async function onRequestGet(context) {
  try {
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
    // Fallback to static asset site_content.json
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

    if (context.env && context.env.NEOGEN_KV) {
      await context.env.NEOGEN_KV.put("site_content", JSON.stringify(body, null, 2));
      return new Response(JSON.stringify({ 
        success: true, 
        persisted: "kv", 
        updatedAt: now,
        count: Object.keys(body).length 
      }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      persisted: "client", 
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
