"use strict";

function State(board, waiter)
{
    this.board = board;
    this.waiter = waiter;
}
State.prototype.constructor = State;

function StateList()
{
    this.states = [];
    this.currentState = -1;
}
StateList.prototype.constructor = StateList;

StateList.prototype.addState = function(board, waiter)
{
    this.currentState++;
    this.states.length = this.currentState;
    this.states.push(new State(board, waiter));
};

StateList.prototype.getPreviousState = function()
{
    if (this.currentState > 0)
    {
        this.currentState--;
        return this.states[this.currentState];
    }
    else
        return null;
};

StateList.prototype.getNextState = function()
{
    if (this.currentState + 1 < this.states.length)
    {
        this.currentState++;
        return this.states[this.currentState];
    }
    else
        return null;
};

StateList.prototype.updateCurrentWaiter = function(waiter)
{
    if (this.currentState >= 0)
        this.states[this.currentState].waiter = waiter;
};
