"use strict";

/**
  * Represents a Oolong state, holding the curent board and waiter position
  * @constructor
  * @param {Array} board - the board state
  * @param {String} waiter - the table and position of the waiter (cardinal points separated by a -)
  */
function State(board, waiter)
{
    this.board = board;
    this.waiter = waiter;
}
State.prototype.constructor = State;

/**
  * Represents a list of Oolong states
  * @constructor
  */
function StateList()
{
    this.states = [];
    this.currentState = -1;
}
StateList.prototype.constructor = StateList;

/**
  * Adds a new state to the list
  * @param {Array} board - the state's board
  * @param {String} waiter - the table and position of the waiter (cardinal points separated by a -)
  */
StateList.prototype.addState = function(board, waiter)
{
    this.currentState++;
    this.states.length = this.currentState;
    this.states.push(new State(board, waiter));
};

/**
  * Sets the current state to the previous state and returns it
  * @return {State} the new current state
  */
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

/**
  * Sets the current state to the next state and returns it
  * @return {State} the new current state
  */
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

/**
  * Updates the waiter of the current state
  * @param {String} waiter - the table and position of the waiter (cardinal points separated by a -)
  */
StateList.prototype.updateCurrentWaiter = function(waiter)
{
    if (this.currentState >= 0)
        this.states[this.currentState].waiter = waiter;
};
