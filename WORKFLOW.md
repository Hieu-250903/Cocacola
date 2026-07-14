# Workflow Comparison Report: Round 1 vs. Round 2

This report evaluates the difference between utilizing AI with a single vague prompt (Round 1) versus using a precise, constraint-driven prompt within an explore-plan-code-test loop (Round 2).

---

## 1. Quality and Correctness Comparison

### Round 1 (Vague Prompt)
- **Validation**: Handled with crude React state checks. The email validation was simply `!email.includes('@')`, which accepts invalid emails like `a@` or `@b`.
- **UI State Bugs**: When typing the recipient name, backspacing to clear the input triggered `onChange={(e) => setName(e.target.value || 'BẠN')}`. Because state fell back to `'BẠN'`, the input display became stuck or jumped erratically. It also prevented users from deliberately typing "BẠN" as a name.
- **Modularity**: All UI and validation logic were coupled in a single file (`ShareACoke.tsx`), making it impossible to test the validation functions independently.

### Round 2 (Precise Prompt with Constraints)
- **Validation**: Extracted into a pure utility module (`src/features/products/utils/validation.ts`) using robust regex for emails and strict characters constraints for names.
- **UI State**: Resolved the state-jumping bug by separating the input state from the visual representation. The name input starts empty and can be cleared smoothly, while the can displays `displayNameOnCan = formData.recipientName.trim() || 'BẠN'`.
- **Testing**: Added unit tests in `validation.test.ts` covering 11 distinct test cases.

---

## 2. Accessibility (a11y) and Edge Cases

- **Accessibility**: Round 1 completely ignored accessibility, leaving input elements without proper labels or programmatic connections. Round 2 added explicit `<label htmlFor="...">` links, `aria-invalid` attributes to indicate errors to screen readers, and `aria-describedby` to associate fields with their inline error messages. It also utilized the correct `role="alert"` for instant screen-reader notifications upon error or success.
- **Edge Cases**: Round 2 handles profanity checks (`hasProfanity`), prevents form submission during simulated network delay via disabled buttons, and shows real-time character counts (`formData.message.length/100`).

---

## 3. Review Effort and Time Analysis

| Metrics | Round 1 (Vague) | Round 2 (Precise + Verification) |
| :--- | :--- | :--- |
| **Initial Prompting & Code Generation** | ~1 min | ~5 mins (Planning & prompt prep) |
| **Testing Setup & Execution** | 0 mins | ~10 mins (Vitest setup + writing tests) |
| **Review & Bug-fixing Time** | ~15 mins (Finding backspace bug, fixing layout) | ~3 mins (Fixing TypeScript type import errors) |
| **Total End-to-End Time** | **~16 mins** | **~18 mins** |
| **Correctness & Reliability** | Low (Bugs slipped to prod) | High (All edge cases covered by unit tests) |

*Key takeaway*: While Round 1 felt faster initially, it produced a buggy interface. Fixing those bugs manually takes longer than writing precise requirements and unit tests upfront in Round 2.

---

## 4. AI Mistake Caught
During the compilation of Round 2, the compiler complained about import syntax due to `verbatimModuleSyntax` being active in `tsconfig.json`. The AI attempted to import types using normal syntax:
```typescript
import { validateForm, FormFields, FormErrors } from '../utils/validation';
```
This was caught and corrected to:
```typescript
import { validateForm } from '../utils/validation';
import type { FormFields, FormErrors } from '../utils/validation';
```
Without strict compiler verification, this import error would have broken the production build pipeline.
