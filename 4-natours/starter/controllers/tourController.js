const Tour = require('./../models/tourModels')

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};
class APIFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filter(){
        const queryObj = {...this.queryString};
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach( el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        
        this.query = this.query.find(JSON.parse(queryStr));
       // let query = await Tour.find(JSON.parse(queryStr));
       return this;
    }

    sort(){
        if (this.queryString.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }
    limitFields(){
        if ( this.queryString.fields){
            const fields = req.query.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }else {
            this.query = this.query.select('-__v')
        }
        return this;
    }

    paginate(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        // page=2&limit=10 , 1-10, page 1, 11-20, page 2, 21-30 page 3
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}



exports.getAllTours = async (req,res) => {

    try {
        // BUILD QUERY
        // 1A) Filtering
        // const queryObj = {...req.query};
        // const excludeFields = ['page', 'sort', 'limit', 'fields'];
        // excludeFields.forEach( el => delete queryObj[el]);
        

        // // 1B) Advanced filtering
        // let queryStr = JSON.stringify(queryObj)
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        
        // let query = await Tour.find(JSON.parse(queryStr));

        // 2) SORTING 

        // if (req.query.sort){
        //     const sortBy = req.query.sort.split(',').join(' ');
        //     query = query.sort(sortBy)
        // }else{
        //     query = query.sort('-createdAt');
        // }
        
        // 3) Fields limiting

        // if ( req.query.fields){
        //     const fields = req.query.fields.split(',').join(' ');
        //     query = query.select(fields);
        // }else {
        //     query = query.select('-__v')
        // }


        // 4) Pagination
        // const page = req.query.page * 1 || 1;
        // const limit = req.query.limit * 1 || 100;
        // const skip = (page - 1) * limit;
        // // page=2&limit=10 , 1-10, page 1, 11-20, page 2, 21-30 page 3
        // query = query.skip(skip).limit(limit);

        // if ( req.query.page){
        //     const numTours = await Tour.countDocuments();
        //     if ( skip >= numTours) throw new Error('This page does not exist');
        // }


        // EXECUTE QUERY
        const features = new APIFeatures(Tour.find(), req.query).filter().sort();
        const tours = await features.query;
        // query.sort().select().skip().limit()

        // const query = Tour.find()
        // .where('duration')
        // .equals(5)
        // .where('difficulty')
        // .equals('easy');

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: tours.length,
            data: {
                tours
            }
        });
        
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}


exports.getTour = async (req,res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }

};

exports.createTour = async (req, res) => {
    try {
         // const newTour = new Tour ({})
    // newTour.save()

    const newTour = await Tour.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });
        
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updateTour = async (req, res) => {

    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
    
}

exports.deleteTour = async (req, res) => {

    try {
        const tour = await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
    
};