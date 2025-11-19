const Tour = require('./../models/tourModels')



exports.getAllTours = async (req,res) => {

    try {
        // BUILD QUERY
        // 1A) Filtering
        const queryObj = {...req.query};
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach( el => delete queryObj[el]);
        

        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        console.log(JSON.parse(queryStr));
        

        // {  difficulty : 'easy', duration: { $gte: 5 } }
        // {  difficulty : 'easy', duration: { gte: '5' } }
        // gte, gt, lte, lt

        let query = await Tour.find(JSON.parse(queryStr));

        // 2) SORTING 

        if (req.query.sort){
            query = query.sort(req.query.sort)
        }
        

        // EXECUTE QUERY
        const tours = await query;

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