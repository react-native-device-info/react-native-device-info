# Contributing

Thank you for your interest in contributing! Please feel free to put up a PR for any issue or feature request.

## Creating issues

If you notice any bugs in the app, see some code that can be improved, or have features you would like to be added, please create an issue!

If you want to open a PR that fixes a bug or adds a feature, then we can't thank you enough! It is definitely appreciated if an issue has been created before-hand so it can be discussed first.

## Submitting pull requests

### Modifying react-native-device-info

1. Fork this repository
2. Clone your fork
3. Make a branch for your feature or bug fix (i.e. `git checkout -b added-getfoobar`)
4. Work your magic
5. Execute `yarn link` when done.

### Testing your changes

You can test your changes on any React Native application you have set up locally.
You can also use the testing application available at https://github.com/machour/react-native-device-info-test.

Just `cd` to your application and type `yarn link react-native-device-info` to make your app use your local modified package instead of the one from npmjs.com (this is what point 5 was about in the previous section).

If you made changes in the native code, don't forget to run `react-native link` before building your React Native application so that latest changes are taken into account.

### Opening the Pull Request

1. Commit your changes with a message following the [Angular commit conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).
2. Push your branch to your fork
3. Create a pull request from your branch on your fork to `master` on this repo
4. Have your branch get merged in! :star2:

If you experience a problem at any point, please don't hesitate to file an issue to get some assistance!
