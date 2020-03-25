const express = require('express');

exports.getBootcamps = async (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: 'GET all bootcamps'
  });
};

exports.getBootcamp = async (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `GET bootcamp with id ${req.params.id}`
  });
};

exports.createBootcamp = async (req, res, next) => {
  res.status(201).json({
    success: true,
    msg: 'CREATED bootcamp'
  });
};

exports.modifyBootcamp = async (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `MODIFIED bootcamp with id ${req.params.id}`
  });
};

exports.deleteBootcamp = async (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `DELETED bootcamp with id ${req.params.id}`
  });
};
