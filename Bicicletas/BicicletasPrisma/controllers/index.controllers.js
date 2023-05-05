import { PrismaClient } from "@prisma/client";
import { wrappedResponse } from "../utils/functions.js";

const prisma = new PrismaClient()

export const createBicycleController = async (req, res) => {
    let { color, model, lat, long } = req.body;
    lat = parseFloat(lat);
    long = parseFloat(long);
    // console.log("lat: ", lat, "long: ", long);
    if (lat > 90 || lat < -90 || long > 180 || long < -180) {
        return wrappedResponse(res, "latitude or longitude out of range!", 400, null);
    }
    const userId = req.user.id;
    if (isNaN(lat) || isNaN(long) || !color || !model) {
        return wrappedResponse(res, "lat, long, color or model not provided!", 400, null);
    }
    const bicycle = await prisma.bicycle.create({
        data: { 
            color,
            model,
            lat,
            long,
            userId,
    }});
    return wrappedResponse(res, "Bicycle created successfully!", 201, bicycle);
};

export const listBicycleController = async (req, res) => {
    const userId = req.user.id;
    const bicycles = await prisma.bicycle.findMany( { where: { userId }} );
    return wrappedResponse(res, "Bicycles retrieved successfully!", 200, bicycles);
};

export const getBicycleControllerById = async (req, res) => {
    const { id } = req.params;
    const bicycle = await prisma.bicycle.findUnique({ where: { id: parseInt(id) } });
    return wrappedResponse(res, "Bicycle retrieved successfully!", 200, bicycle);
};

export const updateBicycleController = async (req, res) => {
    const id = parseInt(req.params.id);
    let { color, model, lat, long } = req.body;
    lat = parseFloat(lat);
    long = parseFloat(long);
    console.log("lat: ", lat, "long: ", long);
    if (lat > 90 || lat < -90 || long > 180 || long < -180) {
        return wrappedResponse(res, "latitude or longitude out of range!", 400, null);
    }
    if (isNaN(lat) || isNaN(long) || !color || !model) {
        return wrappedResponse(res, "lat, long, color or model not provided!", 400, null);
    }
    const bicycle = await prisma.bicycle.update({
        where: { id },
        data: { color, model, lat, long },
    });
    return wrappedResponse(res, "Bicycle updated successfully!", 200, bicycle);
}

export const deleteBicycleController = async (req, res) => {
    const { id } = req.params;
    const bicycle = await prisma.bicycle.delete({ where: { id: parseInt(id) } });
    return wrappedResponse(res, "Bicycle deleted successfully!", 204, bicycle);
};