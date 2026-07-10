# DeepSeeq — E-Book Reader

HTML-basierter E-Book-Reader für russische Bücher (z.B. «Krieg und Frieden»).
Kern-Features (geplant): EPUB-Anzeige, Text-Vereinfachung per Slider über GLM-5.2,
Übersetzung Russisch ↔ Chinesisch, Authing (Google Login).

---

## 🚀 Hello World live stellen

Dieses Repo enthält aktuell nur `index.html` – eine Demo-Seite, die zeigt,
dass das Deployment funktioniert.

### Variante A — EdgeOne Pages (empfohlen, am schnellsten)

EdgeOne Pages ist wirklich kostenlos und braucht **keine Kontoverifizierung**.

**Ohne CLI (Drag & Drop):**
1. Öffne <https://pages.edgeone.ai/drop>
2. Ziehe `index.html` dorthin (oder kopiere den Inhalt hinein)
3. Sofort online – du bekommst eine öffentliche URL

**Mit CLI (skriptbar):**
```bash
# CLI installieren (siehe https://pages.edgeone.ai/document/edgeone-cli)
# Dann aus dem Projektordner:
edgeone pages deploy ./
```

### Variante B — CloudBase (für später, wenn Backend dazukommt)

CloudBase brauchen wir für **Datenbank + Cloud Function (GLM-Proxy)**. Das
statische Hosting läuft dort auch, ist aber quota-basiert und benötigt eine
verifizierte Tencent-Cloud-Konto.

```bash
# 1. CLI installieren
npm install -g @cloudbase/cli@latest

# 2. Login (öffnet Browser)
tcb login

# 3. In der Konsole eine Umgebung anlegen (Region + 按量计费/pay-as-you-go),
#    envId kopieren, statisches Hosting aktivieren

# 4. Deploy
tcb hosting deploy ./ -e <dein-envId>
```

Danach erreichbar unter `https://<envId>.tcloudbaseapp.com`.

---

## 🏗️ Architektur (Ziel)

| Schicht | Produkt | Zweck |
|---------|---------|-------|
| Frontend (statisch) | EdgeOne Pages | Reader-UI |
| Backend (BaaS) | CloudBase | DB + Cloud Functions |
| KI-Proxy | CloudBase Cloud Function | GLM-5.2-Aufruf mit geschütztem API-Key |
| Auth | Authing | Google Login |
| Hosting Frontend | EdgeOne Pages | globales Edge-CDN |

---

## ✅ Checkliste für die nächsten Schritte

- [ ] Hello World auf EdgeOne Pages live (Variante A)
- [ ] CloudBase-Umgebung anlegen + envId notieren
- [ ] Cloud Function als GLM-5.2-Proxy bauen
- [ ] DB-Schema (`books`, `paragraphs`, `translations`, `users`) anlegen
- [ ] EPUB-Parser + Absatz-Anzeige im Frontend
- [ ] Slider pro Absatz → Vereinfachung
- [ ] Übersetzung Russisch ↔ Chinesisch
- [ ] Authing (Google Login) integrieren
