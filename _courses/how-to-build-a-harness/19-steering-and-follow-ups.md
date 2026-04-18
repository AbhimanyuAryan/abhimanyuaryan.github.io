---
layout: course-chapter
course: "How to Build a Harness"
course_slug: how-to-build-a-harness
order: 19
chapter_id: steering-and-follow-ups
chapter_label: "19"
part_label: "Part 6 — From Loop to Agent"
tab_title: "Steering & Follow-ups"
title: "19. Steering & Follow-ups"
description: "Inject messages mid-run, queue follow-up prompts."
---

pi lets you inject messages while the agent is running (steering) or after it finishes (follow-ups).

**File:** [`packages/agent/src/agent.ts` L252-259](https://github.com/badlogic/pi-mono/blob/main/packages/agent/src/agent.ts#L252-L259)

```typescript
/** Queue a message to be injected after the current assistant turn finishes. */
steer(message: AgentMessage): void {
  this.steeringQueue.enqueue(message);
}

/** Queue a message to run only after the agent would otherwise stop. */
followUp(message: AgentMessage): void {
  this.followUpQueue.enqueue(message);
}
```

The loop checks for these between turns:

**File:** [`packages/agent/src/agent-loop.ts` L216-225](https://github.com/badlogic/pi-mono/blob/main/packages/agent/src/agent-loop.ts#L216-L225)

```typescript
pendingMessages = (await config.getSteeringMessages?.()) || [];
// If inner loop exhausted, check for follow-ups
const followUpMessages = (await config.getFollowUpMessages?.()) || [];
if (followUpMessages.length > 0) {
  pendingMessages = followUpMessages;
  continue; // Restart inner loop
}
```

For a minimal harness, you can skip steering entirely. Just read user input, run the loop, print the result.
