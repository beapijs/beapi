## Contributing to BeAPI
BeAPI is an API wrapper for Minecraft Bedrock Editions new GameTest scripting API. We aim to add more functionality with easier to understand methods.
There are currently multiple community projects and developer personal projects that utilize this framework.

Us developers of BeAPI encourage the open-source philosophy.

The [Open Source Guides](https://opensource.guide/) website has a collection of resources for individuals, communities, and companies who want to learn how to run and contribute to an open source project. Contributors and people new to open source alike will find the following guides especially useful:

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Building Welcoming Communities](https://opensource.guide/building-community/)

## Code of Conduct
BeAPI has specific guidlines we expect project contributers/participants to abide by. Please see [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for the full text.

## Getting Involved
There are a multitude of ways to contribute to BeAPI with a handful of them even not requiring you to write code!

Heres a few ideas to get started:
- Simply start using BeAPI. Follow through the [Getting Started](https://mcbe-utilities.github.io/BeAPI/docs/starting) guide. Does everything work as expected/advertised? If not, we are looking to constantly improve ourselves. Let us know by [opening an issue](https://github.com/MCBE-Utilities/BeAPI/issues/new/choose).
- Look through [open issues](https://github.com/MCBE-Utilities/BeAPI/issues). Provide workarounds, ask for clarifications, suggest labels, help [triage issues](#triaging-issues-and-pull-requests).
- [Open pull requests](https://github.com/MCBE-Utilities/BeAPI/compare), if you see issues you believe you can fix feel free to contribute the fixes.
- Read through the [documentation](https://mcbe-utilities.github.io/BeAPI). If you find typos, something confusing, something not worded well, something can be improved. You can click "Edit this page" at the bottom of most docs.
- Help translate the documentation at our [Crowdin](https://crowdin.com/project/beapi).

Contributions are very welcome. If you think you need help planning your contribution, please ping us on [Discord](https://discord.gg/DPRYsU4yf4) and let us know you are looking for a bit of help.

### Join our Discord guild
We have many new developers who are constantly trying to learn and improve themselves. You can help other by joining our [Discord](https://discord.gg/DPRYsU4yf4)

### Triaging Issues and Pull Requests
A great way you can contribute to the project without writing any code is to help us triage issues and pull requests as they come in.
- Ask for more information if you believe the issue does not provide all the details required to solve it.
- Suggest labels that can help categorize issues.
- Flag issues that are stale or that should be closed.
- Help code reviewing.

## Our Development Process
BeAPI is based completely on [GitHub](https://github.com/MCBE-Utilities/BeAPI). The core team will contribute directly to here. All cahnges from the very beginning are publically accessible.

Pull requests will be reviewed and tested by the core team for the time being until we integrate Github actions.

### Branch Organization
BeAPI has two primary branches `beta` and production `production`. We will also may have multiple feature and major semver tagged branches.
On occassions we may have one or more `development` branches as well. BeAPIs production releases are purely based off of when Minecraft Bedrock Edition releases their current beta to production. Sometimes Mojang will release new betas before releasing the old beta into production which in turn we have to change up our workflow to match a bit thus the `development` branches.

- `production`: The production branch is the currently released code. We do not accept major or minor changes to this branch only mandatory bug fixes.
- `beta`: This 8 out of 10 times is the primary branch we will develop and create new feature on. Once Mojang releases their beta version to production, we merge this branch into production and graduate the release.
- `development`: Development branches are only created when Mojang releases a new beta and does not graduate the last one to production. These branches will only exist until we can graduate the current beta to production. 

## Issues
When [opening a new issue](https://github.com/MCBE-Utilities/BeAPI/issues/new/choose), always make sure to fill out the issue template. **This step is very important!** Not doing so may result in your issue not being managed in a timely fashion. Don't take this personally if this happens, and feel free to open a new issue once you've gathered all the information required by the template.

**Please don't use the GitHub issue tracker for questions.** If you have questions about using BeAPI, please ask in our [Discord](https://discord.gg/DPRYsU4yf4), and contributers or community members will do their best to answer your questions.

### Bugs
As stated in [our development process](#our-development-process). BeAPIs source is centralized on [GitHub](https://github.com/MCBE-Utilities/BeAPI). So with that being said we use [GitHub Issues](https://github.com/MCBE-Utilities/BeAPI/issues) for our public bugs.

If you would like to report a problem, be sure to take a look around and ensure somebody has not already opened an issue about it. If you are certain this is a new, unreported bug, you can submit a [bug report](https://github.com/MCBE-Utilities/BeAPI/issues/new?assignees=&labels=bug%2Cstatus%3A+needs+triage&template=bug.yml)

- **One issue, one bug:** Please report a single bug per issue, not an ant hill worth.
- **Provide reproduction steps:** List all the steps necessary to reproduce the issue. The person reading your bug report should be able to follow these steps to reproduce your issue with minimal effort. *If they can't then it will be passed off as user error.*

### Security Bugs
Please do not make a public issue for security bugs. Take it up personally with one of the maintainers through email or dms on Discord.

### Feature requests
If you would like to request a new feature or enhancement but are not yet thinking about opening a pull request, you can file an issue with the [feature template](https://github.com/MCBE-Utilities/BeAPI/issues/new?assignees=&labels=feature%2Cstatus%3A+needs+triage&template=feature.yml) in the form of an elaborated RFC.

### Proposals
If you intend to make any non-trivial changes to existing implementations, we recommend filing an issue with the [proposal template](https://github.com/MCBE-Utilities/BeAPI/issues/new?assignees=&labels=proposal%2Cstatus%3A+needs+triage&template=proposal.yml). This lets us reach an agreement on your proposal before you put significant effort into it. These types of issues should be rare.

### Claiming issues
A good place to dip your toes in the BeAPI codebase would be issues tagged [good first issue](https://github.com/MCBE-Utilities/BeAPI/labels/good%20first%20issue). This would be a great place to get started.

Apart from the `good first issue` label, these are also labels worth looking at:
- [`help wanted`](https://github.com/MCBE-Utilities/BeAPI/labels/help%20wanted): if you have specific knowledge in one domain, working on these issues can make your expertise shine.
- [`status: accepting pr`](https://github.com/MCBE-Utilities/BeAPI/labels/status:%20accepting%20pr): community contributors can feel free to claim any of these.

If you would like to work on an issue, just drop a message saying "I'd like to work on this", and we will assign the issue to you and update the the issue's status as "claimed". **You are expected to send a pull request within seven days** after that, so we can still delegate the issue to someone else if you are unavailable.

Alternatively, when opening an issue, you can also click the "self service" checkbox to indicate that you'd like to work on the issue yourself, which will also make us see the issue as "claimed".

## Development

### Installation
1. Ensure you have [NodeJS](https://nodejs.org/en/), [NPM](https://www.npmjs.com/), and [Minecraft Preview](https://aka.ms/PreviewWindowsFix) installed.
2. After cloning the repository, run `npm run i` in the root of the repository. This will install all dependecies for the root and workspaces.
4. Copy one of the scaffolds from `packages/create-beapi` prefixed with `template-` into your `development_behaviour_packs` folder for Minecraft Preview Edition.
5. Copy the full directory path for `packages/beapi` in the cloned repository and run `npm i path_to_packages/beapi` in the copied scaffold directory.
6. Run `npm run build` in the root of the BeAPI repository and `npm run build` in the scaffold you copied.
7. Every time you make a change to `packages/beapi` you will need to build both.


https://user-images.githubusercontent.com/61068742/161247335-e989f450-c414-40ee-bc5b-57cbb3f161c4.mp4

### Code Conventions
- **Most important:: Look around.** Match the style you see used in the rest of the project. This includes formatting, naming files, naming things in code, naming things in documentation, etc.
- "Attractive"
- Prettier (a formatter) and ESLint (a syntax linter). Use editor extensions.
- COMMENTS!

Don't worry too much about styles in general—the maintainers will help you fix them as they review your code.

## Pull Requests

So you have decided to contribute code back to upstream by opening a pull request. You've invested a good chunk of time, and we appreciate it. We will do our best to work with you and get the PR looked at.

Working on your first Pull Request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

Please make sure the following is done when submitting a pull request:

1. **Keep your PR small.** Small pull requests (~300 lines of diff) are much easier to review and more likely to get merged. Make sure the PR does only one thing, otherwise please split it.
2. **Use descriptive titles.** It is recommended to follow this [commit message style](#semantic-commit-messages).
3. **Test your changes.**

All pull requests should be opened against the `beta` (or `development` see [Branch Organization](#branch-organization)) branch.

We currently have not many integration systems that run automated tests to guard mistakes. For the time being maintainers will review your code to help guard any issues.

### Semantic Commit Messages
See how a minor change to your commit message style can make you a better programmer.

Format: `<type>(<scope>): <subject>`

`<scope>` is optional. If your change is specific to one/two packages, consider adding the scope. Scopes should be brief but recognizable, e.g. `player`, `cli`, `docs`

The various `<type>`s of commits:
- `feat`: a new API or behavior **for the end user.**
- `fix`: a bug fix **for the end user.**
- `docs`: a change to the website or other Markdown documents in our repo.
- `refactor`: a change to production code that leads to no behavior difference, e.g. splitting files, renaming internal variables, improving code style...
- `test`: adding missing tests, refactoring tests; no production code change.
- `chore`: upgrading dependencies, releasing new versions... Chores that are regularly done for maintenance purposes.
- `misc`: anything else that doesn't change production code, yet is not `test` or `chore`. e.g. updating GitHub actions workflow.

Do not get too stressed about PR titles, however. Your PR will be squash-merged and your commit to the branch will get the title of your PR, so commits within a branch don't need to be semantically named. The maintainers will help you get the PR title right, and we also have a PR label system that doesn't equate with the commit message types. Your code is more important than conventions!

Example:

```
feat(core): add chat methods to player struct
^--^^----^  ^------------^
|   |       |
|   |       +-> Summary in present tense. Use lower case not title case!
|   |
|   +-> The package(s) that this change affected.
|
+-------> Type: Uses same commit message types.
```

### Versioned Docs
If you only want to make doc changes, you just need to be aware of versioned docs.

- `docs` - The files here represent the `beta` branch / version.
- `versioned_docs/version-MAJ.MIN.x` - These are the docs for the production and past versions.

Don't edit the versioned docs as it will not propegate to beta and as stated in our workflow we only push bug fixes to production builds, nothing api changing.

### Breaking Changes
When adding a new breaking change, follow this template in your pull request:

```md
### New breaking change here

- **Who does this affect**:
- **How to migrate**:
- **Why make this breaking change**:
- **Severity (number of people affected x effort)**:
```
