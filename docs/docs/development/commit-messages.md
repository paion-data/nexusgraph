---
sidebar_position: 7
title: Commit Messages
---

We have very precise rules over how our git commit messages can be formatted. This leads to more readable messages that
are easy to follow when looking through the project history.

General Rules
-------------

1. Separate subject from body with a blank line
2. Limit the subject line to 70 characters
3. Capitalize the subject line
4. Do not end the subject line with a period
5. Use the imperative mood in the subject line
6. Use the body to explain what and why vs. how
7. Each commit should be a single, stable change

Merge v.s. Rebase
-----------------

Nexus Graph uses a rebase workflow. That means that every commit on its own should be a clear, functional, and stable
change. This means then when we're building a new feature, we should try to pare it down into functional steps, and
when that's not reasonable, the end patch should be a single commit. This is counter to having a Pull Request which may
include "fix [unmerged] behavior". Those commits should be squashed, and the final patch when landed should be rebased.

Remember: each commit should follow the commit message format and be stable (green build).

### Squashing

When you are squashing your branch, it's important to make sure you update the commit message. If you're using GitHub's
UI it will by default create a new commit message which is a combination of all commits and **does not follow the
commit guidelines**.

If you're working locally, it often can be useful to `--amend` a commit, or utilize `rebase -i` to reorder, squash, and
reword your commits.
