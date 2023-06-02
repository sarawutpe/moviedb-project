import httpClient from './httpClient'

export const serviceGetMovies = async () => {
  const result = await httpClient.get(`/movies`)
  return result
}

export const serviceGetMovieById = async (id) => {
  const result = await httpClient.get(`/movies/${id}`)
  return result
}

export const serviceCreateMovie = async (data) => {
  const result = await httpClient.post(`/movies`, data)
  return result
}

export const serviceUpdateMovieById = async (id, data) => {
  const result = await httpClient.put(`/movies/${id}`, data)
  return result
}

export const serviceDeleteMovie = async (id) => {
  const result = await httpClient.delete(`/movies/${id}`)
  return result
}
