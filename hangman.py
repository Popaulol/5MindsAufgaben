import random


hangman_stages = (
    r"""
                    --------
                   |      |
                   |      
                   |     
                   |      
                   |     
                   -

    """,
    r"""
                    --------
                   |      |
                   |      O
                   |     
                   |      
                   |     
                   -

    """,
    r"""
                    --------
                   |      |
                   |      O
                   |      |
                   |      
                   |     
                   -

    """,
    r"""
                    --------
                   |      |
                   |      O
                   |      |
                   |      |
                   |     
                   -

    """,
    r"""
                    --------
                   |      |
                   |      O
                   |      |
                   |      |
                   |     / 
                   -

    """,
    r"""
                    --------
                   |      |
                   |      O
                   |      |
                   |      |
                   |     / \
                   -

    """,
    r"""
                    --------
                   |      |
                   |      O
                   |     \|
                   |      |
                   |     / \
                   -

    """,
    r"""
                    --------
                   |      |
                   |      O
                   |     \|/
                   |      |
                   |     / \
                   -

    """,
)

word_list = (
    "Apfel",
    "Banane",
    "Gurke",
    "Moehre",
    "Fleischbaellchen",
    "Karotte",
    "Ruebe",
    "Saure Gurke",
    "Monster Energy",
    "Mensch",
    "Informatik",
    "C",
    "Java",
    "Python",
    "Haskell",
    "Rust",
    "Ruby",
    "Brainfuck",
    "Brainfork",
    "Racket",
    "Befunge",
    "TMMLPTEALPAITAFNFAL",
    "Fhqwhgads",
    "Xyzzy",
    "Zzt",
)


def print_guessed_letters_word(word, guesses):
    guesses = guesses + [
        " ",
    ]
    print("".join((c if (c in guesses) else "_") for c in word))


def play(word):
    word = word.lower()  # Sicherstellen, dass alle buchstaben klein sind
    current_stage = 0
    guesses = []
    while True:
        print(hangman_stages[current_stage])
        print_guessed_letters_word(word, guesses)
        print("Schon versuchte Buchstaben: " + ", ".join(guesses))
        while True:
            guess = input(
                "Rate einen Buchstaben, ein Wort, oder drücke $ um aufzulösen."
            ).lower()
            if guess == "$":
                print(f"Das richtige Wort wäre: {word} gewesen.")
                return False
            if len(guess) == 1:
                if guess in guesses:
                    print("Diesen Buchstaben hast du schon versucht! Rate erneut!")
                    continue
            break

        if guess in word:
            print(
                f"Gut Gemacht, richtig geraten. `{guess}` ist im gesuchten wort vorhanden."
            )
            for character in guess:
                guesses.append(character)
        else:
            guesses.append(guess)
            print(f"Leider Falsch... `{guess}` ist nicht im gesuchten wort vorhanden.")
            current_stage += 1

        if current_stage == len(hangman_stages):
            print(
                f"Du hast es leider nicht geschafft das Wort zu erraten, bevor du gestorben bist :-( Es wäre `{word}` gewesen."
            )
            return False

        if all(
            c
            in guesses
            + [
                " ",
            ]
            for c in word
        ):
            print(f"Du hast es Geschafft! Das Wort war `{word}`.")
            return True


def main():
    print(
        "Wilkommen bei Hangman! Möchtest du mit einem eigenen wort spielen (y) oder ein zufälliges Wort haben? (jeder andere Buchstabe)"
    )
    word = ""
    if input() == "y":
        word = input("Welches Wort sollen wir verwenden?")
    else:
        word = random.choice(word_list)

    play(word)


if __name__ == "__main__":
    main()
