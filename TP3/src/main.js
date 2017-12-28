"use strict";

//From https://github.com/EvanHahn/ScriptInclude
let include=function(){function f(){let a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}let a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(let g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
let serialInclude=function(a){let b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){let d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{let e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

function getUrlVars()
{
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function(m, key, value)
    {
        vars[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return vars;
}

let main = function()
{
    let app = new CGFapplication(document.body);
    let gui = new Interface();
    let scene = new Scene(gui);

    app.init();
    app.setScene(scene);
    app.setInterface(gui);
    let graph = new SceneGraphParser("oolong.xml", scene, true);
    app.run();
};

serialInclude([ '../lib/CGF.js',
				'Scene.js',
				'Interface.js',

				'scenegraph/SceneGraphParser.js',
				'scenegraph/ObjectNode.js',
				'scenegraph/ObjectGraph.js',
				'scenegraph/ObjectTexture.js',

                'oolong/Oolong.js',
                'oolong/Oolong_state.js',
                'oolong/Coord.js',
                'oolong/Piece.js',
                'oolong/Dish.js',
                'oolong/StateList.js',
                'oolong/CameraOrbiter.js',
                'oolong/Counter.js',

				'primitives/PrimitiveRectangle.js',
				'primitives/PrimitiveCylinder.js',
				'primitives/PrimitiveSphere.js',
				'primitives/PrimitiveTriangle.js',
				'primitives/PrimitiveNURBS.js',
                'primitives/PrimitivePolygon.js',

				'animations/Animation.js',
				'animations/LinearAnimation.js',
				'animations/SimpleLinearAnimation.js',
				'animations/CircularAnimation.js',
				'animations/BezierAnimation.js',
				'animations/ComboAnimation.js',

                main
]);
