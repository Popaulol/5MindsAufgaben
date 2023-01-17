class Board:
    board: list[list[str]]
    size: int
    def __init__(self, size) -> None:
        self.size = size
        self.board = self.create_board(size)

    @staticmethod
    def create_board(size: int) -> list[list[str]]:
        return [["_" for _ in range(size)] for _ in range(size)]

    def show_board(self) -> None:
        print("|", end="")
        for row in self.board:
            for col in row:
                print(col + "|", end="")
            print("\n|", end="")
        for i in range(1, self.size + 1):
            print(str(i) + "|", end="")
        print()

    def is_valid_turn(self, col: int) -> bool:
        return self.board[0][col] == "_"

    def add_coin_to_board(self, col, symbol) -> None:
        for index, row in enumerate(self.board):
            if row[col] != "_":
                self.board[index - 1][col] = symbol
                return
        self.board[ - 1][col] = symbol
