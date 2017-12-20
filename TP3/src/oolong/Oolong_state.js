Oolong.prototype.resetState = function()
{
    //altered during the match
    this.currentPickedPiece = 0;
    this.currentPickedDish = 0;
    this.newPick = false;
    this.moveIsValid = false;
    this.currentPlayer = false;
    this.currentPlayerType = false;
    this.winner = "none";
    this.winnerIsSet = false;
    this.aiMove = null;
    this.aiMoveReady = false;

    //state machine breakpoints
    this.running = false;
    this.readyForTurn = false;
    this.readyForChoice = false;
    this.readyForMove = false;
    this.readyForVictory = false;
    this.readyForUpdate = false;

    //server request flags
    this.requestedMove = false;
    this.requestedPlayer = false;
    this.requestedPlayerType = false;
    this.requestedWinner = false;
};

Oolong.prototype.stateTurn = function()
{
    console.log("IN TURN");
    if (!this.requestedPlayerType)
    {
        this.request("current_player_type");
        this.requestedPlayerType = true;
    }

    if (!this.requestedPlayer)
    {
        this.request("current_player");
        this.requestedPlayer = true;
    }
};

Oolong.prototype.stateChoice = function()
{
    //if current player is human, get position from him
    if (this.currentPlayerType == "human")
    {
        console.log("In Human");
        if (this.currentPickedDish != 0 &&
            this.currentPickedPiece != 0 &&
            this.newPick)
        {
            let dish = this.getPickedDish();

            if (!this.requestedMove)
            {
                this.request("move_human(" + dish.pos + ")");
                this.requestedMove = true;
            }
            if (this.moveIsValid)
            {
                this.makeMove();
            }
        }
    }
    //if current player is AI, ask the logic to generate a move
    if (this.currentPlayerType == "ai")
    {
        this.currentPickedDish = -1;
        this.currentPickedPiece = -1;
        this.newPick = false;

        if (!this.requestedMove)
        {
            this.request("move_AI");
            this.requestedMove = true;
        }
        if (this.aiMoveReady == true)
        {
            console.log("Making AI move " + this.aiMove);
        }

    }
    //this.readyForChoice = false;
};

Oolong.prototype.stateMove = function(time)
{
    console.log("IN MOVE");
};

Oolong.prototype.stateVictory = function()
{
    console.log("IN WINNER");
    this.readyForVictory = false;
    this.request("victory");
    this.requestedWinner = true;
};

Oolong.prototype.stateUpdate = function()
{
    console.log("IN UPDATE");
};

Oolong.prototype.update = function(time)
{
    if (!this.running)
        return;

    //get current player and its type
    if (this.readyForTurn)
    {
        this.stateTurn();
    }

    //current player chooses a piece and a position
    if (this.readyForChoice)
    {
        this.stateChoice();
    }

    //move the piece
    if (this.readyForMove)
    {
        this.stateMove(time);
    }

    //check for victory
    if (!this.requestedWinner && this.readyForVictory)
    {
        this.stateVictory();
    }

    if (this.winnerIsSet)
    {
        if (this.winner == "black" || this.winner == "green")
        {
            console.log(this.winner + " player wins!");
            this.running = false;
        }
    }

    //update board
    if (this.readyForUpdate)
    {
        this.stateUpdate();
    }
};
