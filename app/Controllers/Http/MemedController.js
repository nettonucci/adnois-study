"use strict";
const axios = require("axios");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with memeds
 */
class MemedController {
  /**
   * Show a list of all memeds.
   * GET memeds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, params }) {
    try {
      var config = {
        method: "get",
        url: `https://sandbox.api.memed.com.br/v1/sinapse-prescricao/usuarios/${params.id}?api-key=iJGiB4kjDGOLeDFPWMG3no9VnN7Abpqe3w1jEFm6olkhkZD6oSfSmYCm&secret-key=Xe8M5GvBGCr4FStKfxXKisRo3SfYKI7KrTMkJpCAstzu2yXVN4av5nmL`,
        headers: {
          Accept: "application/vnd.api+json",
        },
      };
      const res = await axios(config);
      const token = res.data.data.attributes.token;
      console.log();

      return response.status(res.status).json(res.data.data);
    } catch (e) {
      return response.status(404).json({ token: null });
    }
  }

  /**
   * Create/save a new memed.
   * POST memeds
   *
   */
  async store({ request, response }) {
    try {
      const doctorInfo = request.only([
        "external_id",
        "nome",
        "sobrenome",
        "data_nascimento",
        "cpf",
        "email",
        "cidade",
        "uf",
        "sexo",
        "crm",
        "especialidade",
      ]);
      const url =
        "https://sandbox.api.memed.com.br/v1/sinapse-prescricao/usuarios?api-key=iJGiB4kjDGOLeDFPWMG3no9VnN7Abpqe3w1jEFm6olkhkZD6oSfSmYCm&secret-key=Xe8M5GvBGCr4FStKfxXKisRo3SfYKI7KrTMkJpCAstzu2yXVN4av5nmL";

      const values = {
        data: {
          type: "usuarios",
          attributes: {
            external_id: doctorInfo.external_id,
            nome: doctorInfo.nome,
            sobrenome: doctorInfo.sobrenome,
            data_nascimento: doctorInfo.data_nascimento,
            cpf: doctorInfo.cpf,
            email: doctorInfo.email,
            uf: doctorInfo.uf,
            sexo: doctorInfo.sexo,
            crm: doctorInfo.crm,
          },
          relationships: {
            cidade: {
              data: { type: "cidades", id: doctorInfo.cidade },
            },
            especialidade: {
              data: { type: "especialidades", id: doctorInfo.especialidade },
            },
          },
        },
      };

      const responseMemed = await axios.post(url, values, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/vnd.api+json",
        },
      });
      return response.send(responseMemed.data);
    } catch (error) {
      if (error.response.data) {
        return response.status(error.response.status).send(error.response.data);
      }
      return response.send({ message: error.response });
    }
  }

  /**
   * Display a single memed.
   * GET memeds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update memed details.
   * PUT or PATCH memeds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a memed with id.
   * DELETE memeds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = MemedController;
