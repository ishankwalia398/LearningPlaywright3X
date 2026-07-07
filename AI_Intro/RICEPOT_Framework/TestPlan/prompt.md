# Prompt: Generate the Test Plan from the PRD

---

## R — Role

You are a **Principal QA Test Architect** with 15+ years of experience leading test strategy for enterprise-grade SaaS platforms, specifically **Digital Experience Optimization (DXO) / CRO platforms** like VWO, involving A/B testing engines, statistical analysis systems, behavioral analytics (heatmaps/session recording), personalization engines, and third-party data integrations. You are ISTQB-certified and have delivered test plans that were signed off by Product, Engineering, and Client stakeholders before entering execution. You think in terms of risk coverage, traceability, and measurable exit criteria — not generic checklists.

---

## I — Instructions

* Read the entire attached **VWO Product Requirements Document (PRD)** before producing anything. Extract every Functional Requirement (FR1–FR9), every Non-Functional Requirement (Performance, Security, Scalability, Data Privacy, Reliability), and every User Flow (5.1 Setting Up an A/B Test, 5.2 Analyzing Behavioral Data) before writing the Test Plan.
* `[Mandatory]` The Test Plan must follow **exactly** the section structure and heading order of the attached **Test Plan Template** (TheTestingAcademy format): Objective → Scope → Inclusions → Test Environments → Defect Reporting Procedure → Test Strategy → Test Schedule → Test Deliverables → Entry and Exit Criteria (Requirement Analysis / Test Execution / Test Closure) → Tools → Risks and Mitigations → Approvals. Do not rename, reorder, merge, or drop any of these sections.
* `[Mandatory]` In **Scope → Inclusions**, break coverage down by VWO module, mirroring how the template broke Restful Booker down by CRUD operation — i.e., produce dedicated sub-sections for: Experimentation & Testing (A/B, Split URL, Multivariate), SmartStats Engine validation, Visual & Code Editor, Behavioral Insights (Heatmaps, Session Recordings, Surveys, Funnels), Personalization Engine, Integrations (Shopify, Salesforce, Segment, Snowflake, WordPress, Drupal, CDPs/analytics), and Program/Workflow Management (Kanban planning, collaboration).
* `[Mandatory]` Map every Inclusion sub-section back to its source Functional Requirement ID (FR1–FR9) from the PRD so coverage is traceable.
* `[Critical]` Include Functional, Data Validation, Error Handling, Performance, Security, Integration, Compatibility (cross-browser/cross-device per NFR), Regression, Edge Case, and Concurrency testing categories — matching the breadth of the template — but populate each with VWO-specific scenarios, not generic API scenarios copied from the template's Restful Booker content.
* `[Critical]` Explicitly test the **statistical validity of SmartStats** (Bayesian engine) as its own testing category — e.g., correctness of "winner" determination, behavior with insufficient sample size, behavior with inconclusive results — since this is a differentiating, high-risk feature unique to VWO.
* `[Critical]` For **Test Environments**, define environment rows (Env name → URL/placeholder) plus OS/Browser/Device matrix, following the template's format (Windows/Chrome/Firefox/Edge, Mac/Safari, Android/Chrome, iOS/Safari) but scoped to what's realistic for a web-based DXO platform (desktop + mobile web, since VWO is browser-based, not a native mobile app).
* `[Critical]` For **Defect Reporting Procedure**, retain the template's structure (criteria for a defect, reporting steps, triage/severity process, tools, roles, communication cadence, metrics) but adapt the POC/role table to generic role placeholders (e.g., Frontend Lead, Backend Lead, DevOps Lead) since the PRD doesn't name individuals.
* `[Critical]` For **Test Strategy**, retain the template's technique list (Equivalence Class Partition, Boundary Value Analysis, Decision Table, State Transition, Use Case Testing, Error Guessing, Exploratory Testing) and its phased approach (Smoke → Stable Build → In-depth → Multi-environment parallel testing → Bug reporting cadence) and its best practices (Context-Driven, Shift-Left, Exploratory, End-to-End), but rewrite all illustrative examples to reference VWO flows (e.g., end-to-end = hypothesis → audience targeting → variation setup → launch → SmartStats result).
* `[Mandatory]` **Test Schedule**: retain the 4-row task table (Creating Test Plan / Test Case Creation / Test Case Execution / Summary Reports Submission Date) with placeholder date columns, and state the sprint count as an assumption if not specified in the PRD (flag this explicitly as an assumption).
* `[Mandatory]` **Test Deliverables**: retain the 4-row deliverables table (Test Plan / Functional Test Cases / Defect Reports / Summary Reports) with the same Description/Target Completion Date columns, rewording Descriptions to fit VWO where needed.
* `[Mandatory]` **Entry and Exit Criteria**: retain all three phases exactly as structured in the template (Requirement Analysis, Test Execution, Test Closure), each with its own Entry Criteria and Exit Criteria bullets.
* `[Mandatory]` **Tools**: propose a VWO-appropriate tool list (bug tracking, API testing, cross-browser testing, performance/load testing, accessibility) instead of copying the template's tools verbatim, since VWO's stack differs from Restful Booker's.
* `[Mandatory]` **Risks and Mitigations**: retain the Risk → Mitigation pairing format from the template, but generate risks specific to VWO from the PRD's own Risks & Mitigations section (Technical Complexity, Data Accuracy Challenges, User Adoption) plus any additional testing-specific risks (e.g., third-party integration instability, statistical engine edge cases, data privacy/GDPR compliance risk).
* `[Mandatory]` **Approvals**: retain the template's approval document list (Test Plan, Test Scenarios, Test Cases, Reports) and the "testing proceeds only after sign-off" statement.
* `[Critical]` Explicitly flag in a closing "Assumptions & Open Questions" note any information the PRD does not specify but the template requires (e.g., exact environment URLs, named POCs, sprint dates, specific tool licenses) — do not silently invent these.
* `[Don't]` Don't include row-level test cases (test steps, test data, expected result per step) — this is a Test PLAN, not a Test Case sheet.
* `[Don't]` Don't leave any template section blank or reduce it to a placeholder — every section must be fully populated with VWO-specific content or an explicit, labeled assumption.

---

## C — Context

You are creating the official **Test Plan for VWO (Visual Website Optimizer)**, an enterprise-grade Digital Experience Optimization and Conversion Rate Optimization platform (app.vwo.com) used by CRO Specialists, Product Managers, UX Designers, Digital Marketers, and Analysts to run A/B/Split/Multivariate tests, gather behavioral insights (heatmaps, session recordings, surveys, funnels), personalize experiences by segment, and manage optimization workflows — all backed by a Bayesian SmartStats engine and integrations with platforms like Shopify, Salesforce, Segment, and Snowflake.

This Test Plan will be reviewed and signed off by the QA Lead, Engineering Manager, and Product Owner before test case creation and execution begin, exactly as described in the Test Plan Template's Approvals section. The two source documents you must synthesize are:

1. **VWO Product Requirements Document (PRD)** — defines what to test (features, NFRs, user flows, KPIs, risks).
2. **Test Plan Template (TheTestingAcademy format)** — defines how the final document must be structured, down to section names, table layouts, and level of granularity.

**[Attach both the VWO PRD and the Test Plan Template to this prompt before sending]**

---

## E — Example

Example of how a template section should be adapted with VWO-specific content while preserving the template's original structure:

**Template's original (Restful Booker) — Inclusions sub-section:**

> Create (POST) Operations: Test the API's ability to create new bookings using valid input data...

**Correctly adapted for VWO — Inclusions sub-section:**

> **Experimentation & Testing (FR1, FR3):** Verify creation of new A/B, Split URL, and Multivariate experiments with multiple variations via both the Visual Editor and Code Editor. Verify invalid/incomplete experiment configurations (e.g., no goal defined, no variation added) are rejected with clear validation messaging. Verify a launched experiment correctly begins traffic allocation per the configured audience targeting rules (FR5).

Example of a Risk/Mitigation entry adapted from the PRD into testing-specific language:

> **Risk:** SmartStats may declare a statistically invalid "winner" if sample size guardrails are not enforced during testing.
> **Mitigation:** Include dedicated test scenarios for minimum sample size thresholds and cross-validate SmartStats output against an independent statistical calculation for a fixed test dataset.

---

## P — Parameters

* Every section of the Test Plan Template must appear in the output, in the same order, fully populated — no section may be skipped, merged, or left as a placeholder.
* All test coverage content must trace back to a specific FR/NFR/User Flow from the PRD; unsupported/invented functionality is not allowed.
* Any gap between what the template asks for and what the PRD specifies (dates, named POCs, environment URLs, licenses) must be explicitly labeled as an **Assumption**, never presented as fact.
* Tone and terminology must match enterprise QA sign-off documentation — the kind reviewed by a QA Lead, Engineering Manager, and Product Owner before execution begins.
* Depth must reflect a platform of VWO's complexity (multi-module SaaS with a statistical engine and third-party integrations) — not a simplified checklist.

---

## O — Output

Produce **one single deliverable: the complete VWO Test Plan, formatted and exported as a PDF file**, using the exact section structure of the Test Plan Template. The PDF must:

1. Include a title page (Product Name: VWO, Document: Test Plan, Prepared By / Date placeholders).
2. Include a Table of Contents matching the template's section list.
3. Present all tables (Test Environments, Test Schedule, Test Deliverables, Risks and Mitigations, etc.) as properly formatted tables — not plain paragraphs.
4. End with the "Assumptions & Open Questions" section described in the Instructions.

No test case-level detail. No commentary or preamble outside the document itself. No output format other than the final PDF — do not additionally output Word, Excel, or raw Markdown as the deliverable.

---

## T — Tone

Technical, precise, formal QA documentation tone — written as a client-facing, sign-off-ready deliverable. No casual language, no hedging, no marketing-style phrasing.
