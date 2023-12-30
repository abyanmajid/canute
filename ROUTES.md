# List of Routes

- **`/`** : Renders the landing page.
  - *Accessibility* : Everyone.
- **`/about`** : Renders the about page.
  - *Accessibility* : Everyone.
- **`/quiz/create`** : Renders a form to create a new quiz.
  - *Accessibility* : Every signed-in User.
- **`/quiz/<quizId>`** : The entry point to a quiz created by a registered user.
  - *Accessibility* : Everyone or only the creator of the quiz.
- **`/quiz/<quizId>/play`** : Renders the list of questions to be solved by the player.
  - *Query string*: `?loggedIn=<boolean>&user=<string>`
  - *Accessibility* : Everyone, some people, or only the creator of the quiz.
- **`/quiz/<quizId>/results`** : Renders the results of the player's performance in the quiz.
  - *Query string*: `?loggedIn=<boolean>&user=<string>&passkey=<string>`
  - *Accessibility* : The player.
- **`/quiz/<quizId>/edit`** : Renders a form to edit the details of a quiz.
  - *Accessibility* : The creator of the quiz.
- **`/quiz/<quizId>/questions`** : Renders a list of existing questions along with buttons to create, update, and delete questions.
  - *Accessibility* : The creator of the quiz.
- **`/quiz/<quizId>/questions/create`** : Renders a form to create a new question.
  - *Accessibility* : The creator of the quiz.
- **`/quiz/<quizId>/questions/<questionId>/edit`** : Renders a form to edit the details of a question.
  - *Accessibility* : The creator of the quiz.
- **`/user/<userId>`** : Renders the profile of a User along with a list of quizzes they have created.
  - *Accessibility* : Everyone.
- **`/terms`** : Renders terms and conditions
  - *Accessibility* : Everyone.
- **`/admin`** : Renders administration forms such as for banning rulebreakers.
  - *Accessibility* : Developer.