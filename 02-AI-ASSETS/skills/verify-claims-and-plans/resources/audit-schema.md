# Audit Schema

## Contents

1. Claim types
2. Verdicts
3. Error taxonomy
4. Confidence
5. Data reliability
6. Research status
7. Report template

## 1. Claim types

- `Fact`
- `Numeric Claim`
- `User-Provided Claim`
- `Forecast`
- `Assumption`
- `Inference`
- `Opinion`
- `Causal Claim`
- `Comparative Claim`

## 2. Verdicts

- **Verified:** Strong evidence directly supports the claim under the relevant
  conditions.
- **Mostly Supported:** The central claim is supported, but wording, scope,
  precision, or context needs correction.
- **Unverified:** Plausible, but available evidence does not establish it.
- **Misleading:** Contains truth but framing, omission, comparison, or precision
  could create a materially wrong impression.
- **Contradicted:** Stronger evidence directly conflicts with the claim.
- **Opinion:** A judgement or preference, not a verifiable fact.
- **Assumption:** A condition accepted for analysis but not established.
- **Insufficient Evidence:** Evidence access or quality is too limited for a
  responsible verdict.

## 3. Error taxonomy

- **AI Hallucination:** The AI fabricated content or asserted unsupported
  information as fact.
- **Fabricated Source:** A source, URL, study, quotation, author, page, or
  reference does not exist as represented.
- **Unsupported Claim:** Evidence does not adequately support the assertion.
- **Source Error:** The claim faithfully reflects a source that is itself wrong,
  unreliable, or unsuitable.
- **Citation Mismatch:** The source exists but does not support the adjacent
  claim.
- **Outdated Information:** The claim relies on information no longer current.
- **Calculation Error:** Inputs, formula, units, rounding, or arithmetic are
  wrong.
- **Reasoning Error:** The conclusion does not logically follow from the
  evidence.
- **False Causality:** Correlation, sequence, or association is treated as causal
  without adequate evidence.
- **Unrealistic Assumption:** A critical assumption lacks credible support or
  conflicts with available constraints.
- **Missing Context:** Omitted scope, denominator, baseline, date, version,
  population, or exception materially changes interpretation.
- **Cherry-Picking:** Relevant contrary or unfavourable evidence is omitted.

## 4. Confidence

- **High:** Evidence is direct, current, applicable, strong, and materially
  consistent.
- **Medium:** Evidence is reasonable but has a meaningful limitation in
  directness, freshness, independence, methodology, or applicability.
- **Low:** Evidence is indirect, weak, conflicting, outdated, or materially
  incomplete.
- **Not Assessable:** Evidence is insufficient to judge.

Never express confidence as a percentage without a real statistical model,
defined data, and explained calibration.

## 5. Data reliability

- **Sufficiently Reliable for This Purpose:** Errors or limitations are unlikely
  to change the intended conclusion.
- **Not Sufficiently Reliable for This Purpose:** Errors or gaps could cause an
  incorrect or unintended conclusion.
- **Reliability Undetermined:** Available checks cannot establish whether the
  data are fit for the intended purpose.

State the intended purpose. Data can be suitable for one use and unsuitable for
another.

## 6. Research status

- `Complete`
- `Preliminary`
- `Blocked by Missing Information`
- `Evidence Insufficient`

## 7. Report template

### Research Status

- Status:
- Verified as of:
- Market or jurisdiction:
- Currency:
- Product or software version:

### Executive Verdict

Answer the decision question directly. State whether the evidence supports
action now.

### Key Findings

List only the most decision-relevant findings first.

### Evidence Table

| ID | Claim | Type | Verdict | Evidence | Source quality | Applicability | Confidence | Correction |
|---|---|---|---|---|---|---|---|---|

### Hallucinations and Errors

For each error, state:

- Claim ID
- Exact error type
- Why it is wrong or unsupported
- Corrected wording
- Decision impact

### Comparison or Feasibility Assessment

Use a matrix or checklist only when it improves the decision. State criteria,
weights, missing data, and trade-offs.

### Risks, Assumptions, and Unknowns

Separate:

- Confirmed risks
- Assumptions that require testing
- Unresolved unknowns
- Evidence or events that would change the verdict

### Recommendation

Give a conditional recommendation. Do not force a winner or overstate certainty.

### Next Actions

Provide prioritised actions, evidence owners, and decision gates.

### Sources and Method

Place citations next to the claims they support. Add a short method note with:

- Source types inspected
- Verification date
- Main limitations
- Claims that could not be verified

Do not expose hidden chain-of-thought or long search logs.

