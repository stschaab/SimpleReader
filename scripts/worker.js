export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Use POST" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!env.GLM_API_KEY) {
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    try {
      const { text, level } = await request.json();
      const prompt = buildPrompt(text, level);

      const glmResponse = await fetch(
        "https://api.z.ai/api/paas/v4/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + env.GLM_API_KEY,
          },
          body: JSON.stringify({
            model: "glm-4.5-flash",
            messages: [
              { role: "system", content: prompt.system },
              { role: "user", content: prompt.user },
            ],
            temperature: 0.3,
          }),
        }
      );

      if (!glmResponse.ok) {
        const errText = await glmResponse.text();
        return new Response(
          JSON.stringify({ error: "GLM API error: " + errText }),
          { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const glmData = await glmResponse.json();
      const simplified = glmData.choices[0].message.content.trim();

      return new Response(JSON.stringify({ simplified }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};

function buildPrompt(text, level) {
  const levelGuide = {
    C1: "C1 (fortgeschritten): Behalte den literarischen Stil und fast den gesamten Wortschatz bei. Glätte nur verschachtelte Sätze leicht, damit sie flüssiger lesbar sind. Moderne Rechtschreibung.",
    B2: "B2 (Mittelstufe): Löse verschachtelte Sätze in kürzere auf. Ersetze seltene oder veraltete Wörter durch gebräuchlichere. Behalte den Sinn und Ton bei, aber vereinfache die Struktur deutlich.",
  };

  const guide = levelGuide[level] || levelGuide.B2;

  return {
    system:
      "Du bist ein Experte für russische Sprache und Literatur. " +
      "Deine Aufgabe ist es, russische Literaturtexte für Deutschsprachige Russisch-Lerner zu vereinfachen. " +
      "Du gibst AUSSCHLIESSLICH den vereinfachten russischen Text zurück, ohne Erklärungen, ohne Anführungszeichen, ohne Einleitung.",
    user:
      "Vereinfache diesen russischen Text auf Niveau " +
      level +
      ".\n\nRegeln:\n- " +
      guide +
      "\n- Behalte Eigennamen bei (Personen, Orte)\n- Gib NUR den vereinfachten Text zurück, nichts anderes\n\nText:\n" +
      text,
  };
}
