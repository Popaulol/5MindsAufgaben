import random


def game(name, minumum_guess, maximum_guess):
    target_number = random.randint(minumum_guess, maximum_guess)
    versuche = 0
    is_first_guess = True
    diff = None  # If this value is actually used within an comparison there's a bug, so we set it to None to get an Exception raised
    while True:
        while True:
            try:
                guess = int(input())
                if not (minumum_guess <= guess <= maximum_guess):
                    print(
                        f"Die zahl {guess} ist außerhalb der Reichweite {minumum_guess}-{maximum_guess}."
                    )
                    continue
                break
            except ValueError:
                print("Das ist keine Zahl")

        if guess == target_number:
            print(
                f"Gut gemacht, {name}! Du hast {versuche} Versuche gebraucht um die Zufallszahl zu erraten!"
            )
            break

        diff = abs(guess - target_number)

        if is_first_guess:
            if guess < target_number:
                print(
                    ("Kalt" if diff > 10 else "Warm")
                    + "! Dein Versuch ist zu niedrig. Rate erneut!"
                )

            elif guess > target_number:
                print(
                    ("Kalt" if diff > 10 else "Warm")
                    + "! Dein Versuch ist zu hoch. Rate erneut!"
                )
            is_first_guess = False

        else:
            if diff > last_diff:
                print("kälter")
            elif diff < last_diff:
                print("wärmer")
            else:
                print("gleich warm")

        last_diff = diff
        versuche += 1


if __name__ == "__main__":
    minumum_guess = 1
    maximum_guess = 100
    name = input("Wie heißt du?")
    print(
        f"Hallo {name}! Ich denke an eine Zahl zwischen {minumum_guess} und {maximum_guess} Welche zahl ist es"
    )
    game(name, minumum_guess, maximum_guess)
    while input(f"Möchtest du erneut spielen, {name}? (y/n)") == "y":
        print("Dann spiele erneut!")
        game(name, minumum_guess, maximum_guess)
    print("Schade... :-(")
