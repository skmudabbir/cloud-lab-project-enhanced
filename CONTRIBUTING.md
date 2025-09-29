# Contributing Guide

Thanks for contributing! Please follow these steps:

1. **Branching**
   - Use feature branches: `feat/<topic>` or `fix/<issue>`.
   - Keep PRs small and focused.

2. **Commits**
   - Follow [Conventional Commits](https://www.conventionalcommits.org/):
     - `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`

3. **PR Process**
   - Create a draft PR early for visibility.
   - Ensure CI passes before requesting review.
   - At least one approval is required to merge.

4. **Testing**
   - Run `docker-compose up -d` to test locally.
   - Add/modify tests in `src/backend/tests`.

5. **Code Style**
   - Python: PEP8.
   - JS/React: Prettier formatting.
