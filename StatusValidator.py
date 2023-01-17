def is_win(board, symbol) -> bool:
    # Rows
    for row in board:
        for col in range(len(row) - 3):
            if row[col] == symbol and row[col + 1] == symbol and row[col + 2] == symbol and row[col + 3] == symbol:
                return True

    # Columns
    for col in range(len(board[0])):
        for row in range(len(board) - 3):
            if board[row][col] == symbol and board[row + 1][col] == symbol and board[row + 2][col] == symbol and board[row + 3][col] == symbol:
                return True

    # left-right-diag
    for col in range(len(board[0]) - 3):
        for row in range(len(board) - 3):
            if board[row][col] == symbol and board[row + 1][col + 1] == symbol and board[row + 2][col + 2] == symbol and board[row + 3][col + 3] == symbol:
                return True

    # right-left-diag
    for col in range(3, len(board[0])):
        for row in range(len(board) - 3):
            if board[row][col] == symbol and board[row + 1][col - 1] == symbol and board[row + 2][col - 2] == symbol and board[row + 3][col - 3] == symbol:
                return True

    return False


def is_draw(board):
    return all(all(place != "_" for place in row) for row in board)
        