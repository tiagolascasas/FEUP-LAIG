function StateList()
{
    this.states = [];
    this.currentState = null;
}

StateList.prototype.addState = function(state)
{
    this.states.push(state);
    this.currentState = this.states.length - 1;
};

StateList.prototype.removeState = function()
{
    if (this.currentState > 0)
    {
        this.states.pop();
        this.currentState--;
        return this.states[this.currentState];
    }
    else
    {
        this.states.pop();
        this.currentState = null;
        return null;
    }
};
