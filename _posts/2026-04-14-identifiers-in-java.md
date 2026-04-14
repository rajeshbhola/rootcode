---
layout: post
title: Java Identifiers
categories: [Backend, Java]
tags: [core java, identifiers, naming convention, clean code]
excerpt: Learn about java identifiers and its rules.
---

## Java Identifiers

Any name used in a Java program is called an **identifier** — whether it's a class name, method name, variable name, or label name.

In `public static void main(String[] args) { int x = 10; }`, the identifiers are `main`, `args`, and `x`.

---

### Rules for Valid Identifiers

**Rule 1 — Allowed characters:** Only these are permitted:
- Letters: `a–z`, `A–Z`
- Digits: `0–9`
- Underscore `_` and dollar sign `$`

**Rule 2 — No other characters:** `Total#` is invalid because `#` is not allowed.

**Rule 3 — Cannot start with a digit:** `ABC123` is valid, but `123ABC` is invalid.

**Rule 4 — Case sensitive:** `number`, `Number`, and `NUMBER` are three completely different identifiers in Java.

**Rule 5 — No length limit:** Technically unlimited, but keeping names under 15 characters is recommended.

**Rule 6 — Reserved words not allowed:** `int if = 10;` is invalid because `if` is a keyword.

**Rule 7 — Class/interface names can be used (but shouldn't be):** You *can* write `int String = 10;` and it compiles, but it's terrible practice.

---

### Quick Quiz — Valid or Invalid?

| Identifier | Result |
|---|---|
| `_$_` | ✅ Valid |
| `Ca$h` | ✅ Valid |
| `Java2share` | ✅ Valid |
| `all@hands` | ❌ Invalid (`@` not allowed) |
| `123abc` | ❌ Invalid (starts with digit) |
| `Total#` | ❌ Invalid (`#` not allowed) |
| `Int` | ✅ Valid (not a keyword — `int` is) |
| `int` | ❌ Invalid (reserved keyword) |
| `Integer` | ✅ Valid (wrapper class name, though not recommended) |

---

The key mental model: think of identifiers as **labels you put on things**. Java is strict about what characters those labels can contain, and it will never let you use its own reserved vocabulary as a label.
