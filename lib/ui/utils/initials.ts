export const countWordOccurrencesInList = (list: string[], word: string) =>
  list.reduce((a, v) => (v === word ? a + 1 : a), 0);

export function getInitialsFromList(list: string[]): string {
  let finalInitials = '';

  if (list.length === 0) return '';

  const ignoredWords = ['AG', 'SA', 'SARL', 'LTD', 'GMBH'];

  let initialsList = [...list];
  if (initialsList.length > 1) {
    // check if initials contains some ignored words
    // and if some word is duplicated in the ignored words list
    let hasDuplicatedIgnoredWords = false;
    initialsList.forEach((initial) => {
      // only count initial word occurrences in initials if the initial word is in the ignored words list
      if (ignoredWords.includes(initial)) {
        const found = countWordOccurrencesInList(initialsList, initial);
        if (found) hasDuplicatedIgnoredWords = true;
      }
    });
    if (hasDuplicatedIgnoredWords) {
      // if it has duplicated in the ignored words, find the item index
      const firstFoundedIdx = initialsList.findIndex((initial) => {
        return ignoredWords.includes(initial.toUpperCase());
      });
      // if index founded, remove the word from the initials list
      if (firstFoundedIdx !== -1) {
        initialsList.splice(firstFoundedIdx, 1);
        return getInitialsFromList(initialsList);
      }
    } else {
      // if not word of ignored words is duplicated in initials
      // filter the ignored words in the initials list
      initialsList = initialsList.filter(
        (word) => !ignoredWords.includes(word.toUpperCase()),
      );
    }
  } else {
    // check PascalCase string
    const pascalCaseInitials = initialsList[0]
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .split(' ');
    if (pascalCaseInitials.length > 1) {
      return getInitialsFromList(pascalCaseInitials);
    }
  }
  if (initialsList.length > 2) {
    finalInitials =
      initialsList[0].charAt(0) +
      initialsList[initialsList.length - 1].charAt(0);
  } else if (initialsList.length > 1) {
    finalInitials = initialsList[0].charAt(0) + initialsList[1].charAt(0);
  } else {
    finalInitials = initialsList[0].substring(0, 2);
  }
  return finalInitials.toUpperCase();
}

export function getInitials(name: string): string {
  if (!name) {
    return '';
  }
  // remove emojis
  const text = name.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');

  if (!text) {
    return '';
  }

  const initials = text.split(' ');
  return getInitialsFromList(initials);
}
