---
sidebar_position: 3
title: Documentation Guide
---

A part of every development project (especially Open Source projects) is documentation that explains how it works.
Nexus Graph is not any different. Because documentation is a big part of what makes Nexus Graph work we've outlined
some guidelines about how this documentation is structured and how to extend it.

What we're covering here is _this site_ and our general approach to documentation.

Repositories
------------

Key places which contain documentation are:

- [docs directory](https://github.com/paion-data/nexusgraph/tree/master/docs) - [paion-data.github.io/nexusgraph](https://paion-data.github.io/nexusgraph/)
- [API Documentation](https://paion-data.github.io/nexusgraph/api/)

Stylistic Choices
-----------------

These are some general guidelines on the style of the language and text layout:

### Language

The language used in the documentation shall follow American English as much as possible. The exception to that rule
are quotations, trademarks or terms that are better known by their British English equivalent.

### Headlines

Capitalization of headlines is always a heavily disputed topic. We generally follow these rules:

- Headlines are capitalized
- Words separated by dashes are generally capitalized on the first word only unless it's a well known term that demands
  title case (for instance because it's also known by an acronym). So for instance it's "Time-series" and "Sans-serif"
  but "Single Sign-On"
- A headline must never follow another smaller headline unless there is text in between. If you cannot achieve that,
  you should leave out one of the headlines.

### The Reader / The Author

The documentation prefers "we" to address the author and reader in one go. So for instance "We are going to step
through this code snippet." is a good example of this.

The gender of the reader shall be neutral if possible. Attempt to use "they" as a pronoun for the reader.

### Paragraphs

Avoid too many short paragraphs in short succession as they read and render terribly. If you end up in a situation
where you think you need this, consider using an enumeration instead.

### Adjacent Code Blocks

Avoid adjacent code blocks without a paragraph of text in between. A code block should typically come with a paragraph
that sets it into context.

### Inclusive Language

<!-- markdown-link-check-disable -->

Nexus Graph is a product designed to be used and developed by many people from different cultural backgrounds and we
try to avoid language that has been identified as hurtful or insensitive. For detailed recommendations see
[Inclusive Language](inclusive-language)

<!-- markdown-link-check-enable -->
