from Player import Player
from Board import Board
from StatusValidator import is_win, is_draw

class MainGame:
    player1: Player
    player2: Player
    board: Board

    def __init__(self) -> None:
        self.player1 = None
        self.player1 = None
    
    def get_user_name(self, player_number) -> str:
        return input(f"Player {player_number}: Please enter your name: ")

    def prepare_game(self) -> str:
        self.board = Board(7)

        self.player1 = Player(self.get_user_name(1), "X")
        self.player2 = Player(self.get_user_name(2), "O")

    def turn(self, player: Player) -> None:
        self.board.show_board()
        while True:
            col = self.get_col_input(player)
            if self.board.is_valid_turn(col):
                break
            print("This column is already fully filled up, please select another column.")

        self.board.add_coin_to_board(col, player.symbol)

        if is_win(self.board.board, player.symbol):
            self.board.show_board()
            print(f"{player.name} wins the game! Congratulations.")
            return False
        
        if is_draw(self.board.board):
            self.board.show_board()
            print("The Game was a Draw!")
            return False
        
        return True
        
    def round(self) -> None:
        return self.turn(self.player1) and self.turn(self.player2)

    def play(self) -> None:
        while self.round():
            pass

    def get_col_input(self, player) -> int:
        print(f"{player.name}: Please select a column to put your coin:")
        while True:
            try:
                col = int(input())
            except ValueError:
                print("That sadly isn't a valid number, please try again: ")
                continue

            if 0 < col < (self.board.size + 1):
                return col - 1 # We subtract one, because we work with 0 indexed list, whilst the Users expect 1 indexing.
            else:
                print(f"This index is out of range of valid column indecies. Please enter a number between 1 and {self.board.size}")
                continue
