---
sidebar_position: 6
title: Development Philosophy
---

This document sets guidelines for how we approach software development at Nexus Graph. This is the result of more than
5 years of history of what worked for us, what did not work and how our understanding evolved. As new developers get
acquainted with the codebase, having this context will be valuable to understand how to approach things.

Beware of Fancy Code
--------------------

We're all engineers, we take pride in our creation. But we are not artists where the act of creation satisfies the
observer. Our work is there to solve customer problems. The tidiest looking code does not win us any prizes. That means
as we work towards solving problems, our way of thinking should be towards our ability to stay nimble while delivering
a stable and high quality product. It can be challenging to make the right call between an abstraction and a duct-tape
solution and you might need help with that call. Even the best developers will sometimes not make the right decision in
that place so you should always consider getting someone else who is experienced for a second opinion, even if you have
a senior engineering level yourself. Sometimes that second, non-influenced opinion is all that is needed to make the
better decision.

Correctness can be a Trap
-------------------------

We always want to strive for correct solutions, but sometimes that correctness comes at a trap. The robustness
principle ("be conservative in what you send, be liberal in what you accept") is a good mental model in what the
baseline of our engineering practices attempt to replicate, even for non protocol related code. We as developers are an
integral part of the machine that we create in that we are the agents that implement the changes. We shape each other's
operational and engineering environment and that is an inherently messy process. Being "too correct" on something can
burden us to the point where it inhibits future change or lowers our satisfaction as engineers, shipping changes.

Many tools that are really helpful, can be burdensome when applied incorrectly. A good example is typing in Python. We
all love type systems. Python is not a strongly typed language, and sometimes the desire to achieve a similar outcome
has disastrous results in productivity at the cost of perceived correctness. But typing that does not provide value can
have the opposite effect.

The balance is delicate and the balance changes with time. Sometimes tooling catches up and makes previously hard to
achieve ideals more accessible, sometimes tooling degrades and what was previously viable stops being the correct
choice. There is a world where typing in the codebase will work out better, but until then don't feel pressured into
adding types to interfaces as part of your changes.

Embrace The Duct Tape
---------------------

Duct tape is a great tool for trying new things and we should not be afraid to use it. Sometimes well applied duct tape
can outlast the life of the feature, other times it's a great solution to help us explore what we actually want to
build.

Build for Inclusion
-------------------

Code that is overly clever is almost never appropriate. When a codebase becomes old, a lot of context will lost over
time and not everybody who has ever contributed will still be in the company. There can be a lot of code people have
created over the years we felt really proud of. But time passed, and what remained of that feeling of accomplishment
and pride often turned into confusion and an obstacle to refactoring. Try to write code to assume a version of yourself
coming back after months on another project or a stressed version of yourself that under pressure of a critical
incident tries to decipher what something was supposed to do.

Make Yourself Uncomfortable
---------------------------

The codebase is your oyster, even if you are not part of it. If you want Nexus Graph to do something different, send up
a PR. Even if you don't know the language or you are not part of the project. While we have code review barriers, we
have no barriers to contributions. Ask for guidance, but don't ask for permission to contribute.

React and TypeScript
--------------------

Those are our languages. You will find some other languages in our code. If you start from scratch, maybe those are not
the languages you will choose. But those are the languages we have, and we have experience with. Those are the
languages we know when to use and crucially, when not to use. There might be more in the future, who knows.

Those languages were chosen when the company was in a certain spot, at a certain size, with certain types of problems.
These languages are not perfect by any means but they serve us well, we have experience with them and know how to use
them. The more we introduce, the more complexities we get in the process.

Databases and State
-------------------

We have traditionally avoided depending on proprietary databases. Part of this is that we're an Open Source company, so
using Open Source data stores comes naturally, but another reason is that we do not want a dependence on a service
we cannot build ourselves out of.

While we are regularly re-evaluating our choices of databases, we do not want to use more than what we have. We know
how to operate and scale what we have and that sets an upper bound to the complexity of what we want to ship to
production today.

Dependencies Cost
-----------------

Dependencies come with a cost and that cost is high. Every dependency we use increases the surface area of our system,
adds more licensing, maintenance and security concerns. We understand that dependencies are necessary for modern
software development but they carry costs. These costs are the limited ability to influence what's happening inside,
the cost of potential upgrades, the risks a dependency carries if the developer behind it decides to change their mind.

See also [Micropackages and Open Source Trust Scaling](https://lucumr.pocoo.org/2016/3/24/open-source-trust-scaling/)

We obviously can't get rid of dependencies, so we believe that our default position about a dependency should be not to
upgrade. There are obvious exceptions to this, but in general we encourage developers to rather stay with older
versions of a library than to go to the bleeding edge. That does not mean we don't upgrade, but we recognize that this
comes at a cost and needs to be considered.

Branches and Pull Requests
--------------------------

We have a very simple branching model: there is a mainline branch (master) and there is feature development happening
on feature branches. There is one rule and that's the most important rule of them all: mainline stays green. Any commit
that ends up on the mainline will be deployed.
