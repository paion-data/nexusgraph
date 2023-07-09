---
sidebar_position: 8
title: Code Review
---

Code review is mandatory at Nexus Graph. This adds overhead to each change, but ensures that simple, often overlooked
problems are more easily avoided. Code review helps build shared context and collective ownership. Code review can
also identify several classes of problem before customers are exposed to them.

Code review is managed via GitHub's Pull Requests (see below for rationale).
[Template](https://github.com/paion-data/nexusgraph/blob/master/.github/pull_request_template.md) exists on repository

Who Should be Reviewing Code
----------------------------

All engineers should be reviewing code. As we gain more experience and context on the products we build and
technologies we use, we can provide valuable feedback to other engineers who may be working in areas that are new to
them but familiar to us.

Code review is an opportunity to improve our mentoring and communication skills. Code review can have the important
function of teaching engineers about the languages, frameworks and technologies we use in a collaborative environment
that is about the changes being made.

Why Pull Requests
-----------------

Because Nexus Graph is an open source project maintained via GitHub we want to ensure that the barrier to entry for
external contributions is minimal. By using GitHub features when possible, we make it easy for developers familiar with
other projects on GitHub. While GitHub's tools [aren't always the best](http://cra.mr/2014/05/03/on-pull-requests),
they work well enough.

Commit Guidelines
-----------------

<!-- markdown-link-check-disable -->
See the [Commit Messages](commit-messages) guide.
<!-- markdown-link-check-enable -->

Code Reviews are for …
----------------------

### Identifying problematic code

Above all, a code review should try to identify potential bugs that could cause the application to break - either now,
or in the future.

- Uncaught runtime exceptions (e.g. potential for an index to be out of bounds)
- Obvious performance bottlenecks (e.g. `O(n^2)` where `n` is unbounded)
- Code alters behavior elsewhere in an unanticipated way
- API changes are not backwards compatible (e.g. renaming or removing a key)
- Complex ORM interactions that may have unexpected query generation/performance
- Security vulnerabilities
- Missing or incorrect Permissions or Access Control.

### Improving Design

When reviewing code, consider if the interactions of the various pieces in the change make sense together. If you are
familiar with the project, do the changes conflict with other requirements or goals? Could any of the methods being
added be promoted to module level methods? Are methods being passed properties of objects when they could be passed the
entire object?

### Tests Included

Look for tests. There should be functional tests, integration tests or end-to-end tests covering the changes. If not,
ask for them. We rely on our test suite to maintain a high quality bar and ship rapidly.

When reviewing tests double check that the tests cover the requirements of the project or that they cover the defect
being fixed. Tests should avoid branching and looping as much as possible to prevent bugs in the test code from gaining
a foothold.

Functional tests that simulate how a user would call our APIs or use our UX are key to preventing regressions and
avoiding brittle tests that are coupled to the internals of the products we ship.

Tests are also the ideal place to ensure that the changes have considered permissions and access control logic.

### Assessing and approving long-term impact

If you're making significant architectural, schema, or build changes that will have long-term ramifications to the
software or data, it is necessary to solicit a senior engineer's acknowledgment and blessing.

- Large refactors
- Database schema changes, like adding or removing columns and tables
- API changes (including JSON schema changes)
- Adopting new frameworks, libraries, or tools
- New product behavior that may permanently alter performance characteristics moving forward

### Double-checking expected behavior

The reviewer should make a genuine attempt to double-check that the goals of the PR appear to be satisfied by the code
submitted. This requires the submitter to write a good description of the expected behavior, and why. See also:
[Guidelines for Submitters](#guidelines-for-submitters) below

### Information sharing and professional development

Code reviews are an opportunity for more people to understand forthcoming code changes, so that they might in turn
teach others down the road, and be in a position to fix something if/when the original author is not available.

Additionally, code reviews are an opportunity to learn about new techniques or approaches, and be exposed to code you
might otherwise not have an opportunity to browse.

### Reducing code complexity

Research shows that Lines of code (LOC) is correlated with a higher bug count. If reviewers see an easy opportunity to
significantly reduce the amount of code that is submitted, they should suggest a different approach.

For example, if a submitter has written a for-loop to find an item in an array:

```javascript
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 'thingiwant') return i;
}
return undefined;
```

It's fair game to suggest they instead use:

```javascript
return arr.find(x => x === 'thingiwant');
```

This is a mostly objective improvement: there are fewer variables, fewer statements, and fewer branches, and the method
name `find` communicates intent. Suggesting these types of uncontroversial improvements is encouraged.

Be careful though - it's easy to go down a rabbit hole of re-writing code to be as small as possible, and in the end
winding up with something ultimately more complicated. Be pragmatic and strive to reach a good balance.

### Enforcing Coding Standards

As much as possible, we use automation to enforce code style and test coverage, but there are exceptions that cannot
necessarily be automated (or perhaps more accurately, we haven't automated them *yet*):

- Variable, file, metric, and logger names are sensible, readable, and consistent with existing code
- Migrations have a deployment plan
- Unused or superfluous code isn't committed accidentally

Code Reviews are NOT for …
--------------------------

### Passing responsibility onto the reviewer

It is not the responsibility of the reviewer that your code is correct, is bug free, or achieves its goals. Reviewers
are there to help you, but if something is wrong, it's your responsibility to correct it.

### Boasting about your Programming Knowledge

As a reviewer, try to stick to objective improvements and make a best-intent assumption that the submitter has done
their homework. Nexus Graph is a No Flex Zone™.

### Introducing Long-Term Architectural Changes for the First Time

While code reviews are great for discussion, they're not the place to introduce large, long-term changes for the first
time. Before dropping a PR that implements those changes, you should write a proposal and reach out to the relevant
parties beforehand.

### Getting it Perfect

Code reviews are expensive. Every time you request a change, you're probably delaying that PR by 24 hours or more. This
can severely inhibit our ability to move fast.

The goal of code reviews is to **reduce risk**, not to produce perfect code. It's okay to ship code in stages, and to
commit to improving something later. If you're thinking - if we don't get it correct up-front, we'll never come back to
it - consider that if it never needs coming back to, perhaps those changes were never necessary in the first place.

> Perfect is the enemy of the good. - Voltaire, probably

Please be pragmatic, and consider the cost of each incremental request for changes.

Guidelines for Submitters
-------------------------

### Try to organize your work in a way that makes it conducive to review

- Ideally, a pull request is limited to only a single feature or behavior change.
- This might feel like more work up-front, but it can make code review faster, reduce risk by letting you ship in
- stages, and ultimately end up being quicker.

### Describe what your PR does in a few sentences in the description field

- Additionally explain **_why_** we're making these changes.
- If applicable, explain why other approaches were explored but not settled on.
- This gives the reviewer context, and prevents them going down the same rabbit holes that that submitter may have
  already explored when creating the code.

### Annotate specific lines in your PR

If you can, give context to specific lines of code that could use elaboration.

### Where appropriate, label in-progress PRs as WIP (work in progress) for early feedback

- Labeling your work as WIP helps set expectations about the state of the PR.
- WIP PRs are good for having someone check-in to make sure you're on the right path.
- Additionally, this is an opportunity to verify CI passes before involving a reviewer.

### Be your own first reviewer

- After you've put up your PR on GitHub, walk through the code yourself, before assigning an external reviewer.
- You'll often catch code mistakes you didn't see when writing it.
- This is also a good time to leave comments and refresh your memory in order to write a more helpful description.

### Assign no more than 1-3 reviewers

It's tempting to want to involve as many people as possible, but it can often be distracting, and create a situation
where nobody's clear on who should actually perform the review.

### Avoid rebasing unnecessarily

- After a rebase, previous review comments will be orphaned from their now non-existent parent commits, making review
  more difficult
- Rewriting history makes it difficult for reviewers to isolate the scope of their review

### Let reviewers know that you've made changes

- Request review again via the "Reviewers" dropdown (There should be a yellow dot next to their name again).
- Don't rely on reviewers' mind-reading skills to know that you're ready to have them look things over again.
- If you resolve a point of actionable feedback, it's helpful to leave a comment to let the reviewer know that it was
  addressed

Guidelines for Reviewers
------------------------

### Be polite and empathetic

- Avoid accusatory and/or judgmental comments like: "You should have done X"

### Provide Actionable feedback

- Instead of "This is bad", try "I feel this could be clearer. What if you renamed variable X to Y?"

### Distinguish between "requires changes" and "nitpicks"

- Consider marking a PR as approved if the only requested changes are minor nits, so as not to block the author in
  another asynchronous review cycle.

### Respond promptly to code review requests

- We're a team  - [we ride together, we die together](https://www.youtube.com/watch?v=1d5Q0vXbODs) - and we need to
  unblock other developers so that we can all move forward.
- We recommend checking for open code reviews at the start and end of every day.

<!-- markdown-link-check-disable -->

- [Github's Review Requests tab](https://github.com/pulls/review-requested) can be a helpful place to keep track of
  these.

<!-- markdown-link-check-enable -->
