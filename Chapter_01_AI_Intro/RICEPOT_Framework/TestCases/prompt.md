
# Prompt: Generate Test Cases from the Test Plan

---

## R — Role

You are a **Senior QA Test Engineer** with 15+ years of experience converting signed-off Test Plans into detailed, execution-ready Test Cases for enterprise SaaS platforms. You have deep experience writing test cases for both **UI/web workflows** and **API-level validation** (Postman/REST), and you are meticulous about following an organization's existing test case template structure exactly — never inventing your own format.

---

## I — Instructions

* Read the entire attached **VWO Test Plan** first. Do not write a single test case until you have listed out every module/feature area covered in the Test Plan's Scope/Inclusions section (Experimentation & Testing, SmartStats Engine, Visual & Code Editor, Behavioral Insights, Personalization, Integrations, Program/Workflow Management).
* `[Mandatory]` Follow the attached **Test Case Excel Template** structure **exactly** — do not invent new column names, reorder columns, or change sheet layout conventions.
* `[Mandatory]` Populate a **"Main" metadata sheet** at the top of the workbook exactly as in the template: Project Name (VWO), Module Name, Created By, Created Date, Peer Review By, Peer Reviewed Date — leave reviewer fields blank/placeholder since they are filled post-creation.
* `[Mandatory]` Create **one separate sheet per module/feature area** from the Test Plan (mirroring how the template split Restful Booker into "Create Booking," "Full Update and Partial Update," "SOAP Request," etc.) — e.g., separate sheets for: `Experimentation-ABTest`, `Experimentation-SplitURL`, `Experimentation-Multivariate`, `SmartStats-Engine`, `VisualCodeEditor`, `BehavioralInsights-Heatmaps`, `BehavioralInsights-SessionRecording`, `Personalization`, `Integrations`, `WorkflowManagement`.
* `[Mandatory]` For every standard functional sheet, use  **exactly these columns, in this order** : `Scenario TID`, `TestCase Description`, `PreCondition`, `TestSteps`, `Expected Result`, `Actual Result`, `Steps to Execute`, `Expected Result`, `Actual Result`, `Status`, `Executed QA Name`, `Misc (Comments)`, `Priority`, `Is Automated`.
* `[Mandatory]` For any **end-to-end / cross-module flow** (e.g., "Define hypothesis → target audience → configure variation → launch → review SmartStats winner"), create a separate **"Integration Scenarios"** sheet using the template's alternate column set: `Scenario TID`, `Test Scenario`, `Test Case Id`, `Test Case Title`, `Pre Condition`, `Steps to Execute`, `Expected Result`, `Actual Result`, `Status`, `Executed QA Name`, `Misc (Comments)`.
* `[Mandatory]` Write every **TestCase Description / Test Case Title** using the template's own convention from its "TIPS" sheet: lead with one of the keywords  **Verify / Validate / Test / Check / Should / Select** , in the form *"Verify that with the [condition], [expected behavior] should work."*
* `[Critical]` For every test case, `Steps to Execute` must contain **numbered, concrete steps** — not vague instructions — matching the template's granularity (e.g., "1. Log in to app.vwo.com 2. Navigate to Experiments > Create New 3. Select A/B Test 4. Enter Test Name... "). Where the flow is API-driven (e.g., integration connectors, reporting data pulls), write steps in the template's Postman-style convention, including a scripting/assertion snippet where relevant (mirroring the `pm.test(...)` examples in the template).
* `[Critical]` Include **positive, negative, and boundary cases** for every feature area — mirroring the template's own pattern of testing valid input, missing required fields, invalid characters, and empty/blank values (as seen in its "firstname = $$$" / "firstname = 123" / "firstname = Empty Blank" rows).
* `[Mandatory]` Populate the `Priority` column (High/Medium/Low) based on the **risk-based prioritization already defined in the Test Plan** — do not assign priority arbitrarily.
* `[Mandatory]` Populate `Is Automated` as `Yes` or `No` per test case, based on whether the scenario is a good automation candidate (stable, repeatable, high-run-frequency) vs. exploratory/manual-only (e.g., visual heatmap accuracy, UX judgment calls).
* Leave `Actual Result`, `Status`, and `Executed QA Name` **blank** for every row — these are populated only during execution, exactly as they are blank in the template.
* Every test case must trace back to a Functional/Non-Functional Requirement ID and Test Scenario ID already defined in the Test Plan — do not create coverage for anything not present in the Test Plan.
* `[Don't]` Don't merge the two functional/integration column formats — keep each sheet consistent with the one column set it uses.
* `[Don't]` Don't leave any column header blank, renamed, or reordered relative to the template.
* `[Don't]` Don't invent UI element names, field labels, or API endpoints not stated or reasonably inferable from the Test Plan/PRD — if a step requires a specific UI label not confirmed in source docs, flag it as an assumption in a dedicated note rather than guessing silently.

---

## C — Context

You are converting the **already-approved VWO Test Plan** into the **execution-ready Test Case workbook** that the QA team will use during test cycles. This workbook is the next deliverable in the QA process immediately after Test Plan sign-off (per the Test Plan's own "Test Deliverables" and "Approvals" sections), and will be used directly by testers during Test Execution — so every cell must be usable as-is, without further rework.

The two inputs you must synthesize are:

1. **VWO Test Plan** (previously generated from the VWO PRD, following the Test Plan Template structure) — defines scope, modules, risk priorities, and test strategy.
2. **Test Case Excel Template** ("Test cases - Ultimate — TheTestingAcademy") — defines the exact workbook structure, sheet-splitting convention, column layout, and test-case-writing style you must replicate.

**[Attach both the VWO Test Plan and the Test Case Excel Template to this prompt before sending]**

---

## E — Example

Example of a correctly adapted functional test case row (adapted from the template's Restful Booker style into VWO's Experimentation module):

| Scenario TID | TestCase Description                                                                                            | PreCondition                                           | Steps to Execute                                                                                                                                                                               | Expected Result                                                                               | Priority | Is Automated |
| ------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------- | ------------ |
| EXP-001      | Verify that with a valid hypothesis, goal, and one variation configured, an A/B Test should launch successfully | User is logged into app.vwo.com with an active project | 1. Navigate to Experiments > Create New 2. Select "A/B Test" 3. Enter test name and hypothesis 4. Define target URL 5. Add one variation via Visual Editor 6. Set primary goal 7. Click Launch | Test status changes to "Running"; traffic begins allocating per configured audience targeting | High     | Yes          |

Example of a negative/boundary case in the same style as the template's blank/invalid field rows:

| Scenario TID | TestCase Description                                                       | Expected Result                                                                    |
| ------------ | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| EXP-004      | Verify that with no goal defined, launching the A/B Test should be blocked | Launch button remains disabled / error message "Please define a goal" is displayed |

Example of an Integration Scenario row (using the template's alternate column set):

| Scenario TID | Test Scenario                                                                                                                              | Expected Result                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| INT-002      | Configure an A/B test, launch it, let SmartStats reach significance, and verify the declared winner matches expected variation performance | SmartStats correctly identifies the winning variation and displays statistically valid confidence level |

---

## P — Parameters

* Every test case must be immediately executable by a tester with no additional interpretation needed.
* 100% column-structure fidelity to the attached template — this is non-negotiable.
* Full traceability: every test case row must map to a Test Scenario ID / Requirement ID from the Test Plan.
* Balanced coverage per module: positive, negative, boundary, and (where applicable) integration/API-level cases — not just happy-path.
* No placeholder rows with missing descriptions or steps.

---

## O — Output

Produce **one single deliverable: an Excel workbook (.xlsx)** matching the structure of the attached Test Case Template, containing:

1. A **Main** sheet with workbook metadata (Project Name: VWO, Module Name, Created By, Created Date, etc.)
2. One **functional test case sheet per module/feature area** (per the Instructions), fully populated per the column set defined above.
3. One **Integration Scenarios** sheet covering cross-module/end-to-end flows.
4. A brief **Assumptions** note (as a final sheet or footer) listing any UI labels, field names, or flows the source documents didn't explicitly confirm.

No commentary outside the workbook. No test case content delivered as prose, Markdown, or PDF — the deliverable is the .xlsx file only, matching the template's format.

---

## T — Tone

Technical, precise, execution-ready QA documentation tone — written exactly as a tester would expect to receive it for immediate use in a test cycle. No casual language, no explanatory narration.
