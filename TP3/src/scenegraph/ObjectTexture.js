"use strict";

/**
  * Represents a texture and its amplification factors
  * @constructor
  * @param {CGFTexture} tex - the texture
  * @param {int} ampS - the amplification factor in the S dimension
  * @param {int} ampT - the amplification factor in the T dimension
  */
function ObjectTexture(tex, ampS, ampT)
{
	this.tex = tex;
	this.ampS = ampS;
	this.ampT = ampT;
};
