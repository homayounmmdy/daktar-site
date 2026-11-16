# Contributing Guidelines

Thank you for your interest in contributing to this project! Every contribution, whether it's a bug fix, feature, documentation improvement, or accessibility enhancement, is appreciated.

These guidelines help maintain consistency, code quality, and a welcoming environment for everyone.

## Getting Started

1. Fork the repository.
2. Clone your fork locally.
3. Install the project dependencies.
4. Create a new branch for your changes.
5. Make your changes and run the relevant tests.
6. Submit a pull request.

## Branch Naming

Use descriptive branch names with the following prefixes:

| Prefix | Purpose |
|---|---|
| `feat/` | New features |
| `fix/` | Bug fixes |
| `docs/` | Documentation |
| `refactor/` | Code refactoring |
| `test/` | Tests |
| `perf/` | Performance improvements |
| `a11y/` | Accessibility improvements |
| `chore/` | Maintenance tasks |

Examples:

```bash
feat/user-authentication
fix/api-response
docs/update-readme
a11y/improve-keyboard-navigation
```

## Commit Message Convention

This project follows the Conventional Commits structure:

```text
<type>(<scope>): <description>
```

Commit types:

| Type | Purpose |
|---|---|
| `feat` | Introduce a new feature |
| `fix` | Fix a bug |
| `add` | Add new files, assets, resources, or supporting code |
| `docs` | Documentation changes |
| `style` | Formatting changes without logic changes |
| `refactor` | Code restructuring without behavior changes |
| `test` | Add or update tests |
| `perf` | Performance improvements |
| `build` | Build system or dependency changes |
| `init` | Initialize project structure, configuration, or scaffolding |
| `ci` | CI/CD configuration changes |
| `chore` | Maintenance tasks |
| `revert` | Revert a previous commit |
| `a11y` | Accessibility improvements |

### Commit Message Language

Commit types and scopes must be written in English.

Descriptions should be written in Dari to support the project's primary language and community.

Examples:

```text
feat(auth): اضافه شدن سیستم ورود کاربران
fix(api): رفع مشکل دریافت اطلاعات کاربران
add(assets): اضافه شدن تصاویر و فونت‌های پروژه
docs(readme): به‌روزرسانی مستندات پروژه
refactor(ui): ساده‌سازی ساختار کامپوننت‌ها
test(auth): اضافه شدن تست‌های احراز هویت
a11y(forms): بهبود دسترسی‌پذیری فرم‌ها
init(project): راه‌اندازی اولیه ساختار پروژه
```

## Code Guidelines

- Write clean, readable, and maintainable code.
- Follow the existing project structure and conventions.
- Use meaningful variable and function names.
- Avoid unnecessary dependencies.
- Keep changes focused and avoid unrelated modifications.
- Add or update tests when necessary.
- Update documentation when your changes affect existing functionality.

## Pull Request Guidelines

Before submitting a pull request:

- Make sure your changes follow the project's conventions.
- Run the relevant tests.
- Check that there are no linting or formatting errors.
- Provide a clear description of your changes.
- Link related issues when applicable.
- Keep pull requests focused on a single purpose.

## Accessibility

Accessibility improvements are welcome and encouraged.

When applicable:

- Ensure keyboard navigation works correctly.
- Use semantic HTML elements.
- Provide accessible labels for interactive elements.
- Maintain sufficient color contrast.
- Support screen readers.

## Questions and Support

If you have questions or need clarification, feel free to open an issue or start a discussion.

Thank you for helping make this project better!