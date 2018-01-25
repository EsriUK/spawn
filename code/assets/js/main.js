require([
    "modules/SceneController"
], function(SceneController) {

    //Session Variables-----------------------------------------------------------------------------
    var sceneController = new SceneController.SceneController("viewDiv");
    var spawner = new Spawn.Spawn();

    //Functions  -----------------------------------------------------------------------------------

    //Build the map and generate a palette from a random image
    function initialise(){
        sceneController.buildScene();
        //.done(function () {

    } 
    

    //Logic ----------------------------------------------------------------------------------------

    initialise();

    console.log(sceneController.getView());
    spawner.doStuff();


});