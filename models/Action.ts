class Action {
    private $scope: any = null;
    public key: string = null;
    public buildSupply: number = 0;
    public objects: any = null;
    public time: string = "";


    constructor($scope : any, key: string, time: string) {
        this.$scope = $scope;
        this.key = key;
        this.buildSupply = key.charCodeAt(0);
        this.objects = {};
        this.time = time;
    }

    /** Merges and actions units with this one  */
    public mergeObjects(action: Action) : void {
        var keys: string[] = Object.keys(action.objects);
        for (var i = 0; i < keys.length; i++) {
            var key: string = keys[i];
            if (key !== '$$hashKey' && action.objects.hasOwnProperty(key)) {
                var newObject = action.objects[keys[i]];

                // If the object is already in the action just merge counts
                if (this.objects[key]) {
                    this.objects[key].Count += newObject.Count;
                } else {
                    this.objects[key] = newObject;
                }
            }
        }
    }

    /** Add an object to the action. If object exists add to count of existing object. */
    public addObject(obj: any) : void{
        if (this.objects[obj.Name]) {
            this.objects[obj.Name].Count += obj.Count;
        } else {
            this.objects[obj.Name] = obj;
        }
    }
}