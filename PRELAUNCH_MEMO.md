pre-Launch Security Review — nkwen-traders-cross-track-titans
Reviewer: Awah Brian 
Date: 28th Aug 2026

Scope of review
Repository history and current codebase. This Review covers exposed secrets and transport security ahead of launch.

1. Repo initial scan: FAIL
Ran `gitleaks detect --source . -v` against full commit history (6 commits scanned, 230.16 KB). Found 1 leak: a hardcoded `API_KEY` constant in `script.js`, line 2, committed by TIZIH-FAITH-NGWI on 2026-08-24 (commit `b706518`). Rule matched: `generic-api-key`, entropy 5.07 and found out it was a real secret, not a false positive.
- Why it matters: a key committed to git history is exposed to anyone with repo access, including in the public GitHub link gitleaks generated automatically — even if you delete it from the current file, it's still recoverable from that commit.
- Recommendation give which was implemented : remove it from the current file, and rewrite it out of history — don't just delete-and-recommit, since that leaves the old blob reachable.

2. Repo re-scan: PASS
After the key was pulled from `script.js` and history was cleaned, re-ran `gitleaks detect --source . -v` .
Result: `no leaks found`. Fix confirmed effective.

3. Web security live site check: FAIL
Visited the live deployed URL directly and checked the browser address bar. The Site loads over HTTP only, and the browser flags it as Not Secure. No padlock, no TLS certificate.
- Why it matters: unencrypted HTTP means any data submitted through the contact form travels in plain text and can be intercepted or tampered with in transit. It also erodes trust — a "Not Secure" warning is exactly the kind of thing that makes a real customer bounce off a small business site.
- Recommendation: Flagged to Cloud Engineer to put CloudFront in front of the S3 bucket with an ACM certificate before public launch, since S3 static hosting alone doesn't support HTTPS. [if HTTPS] No action needed.

4. Contact page review: PASS
- I Reviewed the live contact form's fields against social-engineering red flags: unnecessary urgency language, requests for information a contact form has no legitimate reason to ask for (password, ID numbers, full address, etc).
- Findings: The page asks just for name, email and message.
- Why it matters: These are the exact patterns phishing pages mimic, asking for more than needed, or pressuring quick action without time to think.
- Recommendation: None

5. Overall review
- One real secret leak was found and fixed pre-launch and was confirmed clean on re-scan. No current blockers. CloudFront/TLS was recommended to be added by Cloud Engineer.
