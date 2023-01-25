from MainGame import MainGame

def main() -> None:
    while True:
        game = MainGame()
        game.prepare_game()
        game.play()

        if input("Do you Want to play another game? (y/n)") != "y":
            break

if __name__ == "__main__":
    main()
