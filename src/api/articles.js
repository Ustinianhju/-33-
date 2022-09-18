import request from '@/utils/request'

export const getnewsContent = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
    // params: { article_id: id }
  })
}

export const addFollow = (userId) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: userId
    }
  })
}
export const delFollow = (userId) => {
  return request({
    url: `/v1_0/user/followings/${userId}`,
    method: 'DELETE'
  })
}

export const addArticles = (userId) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: userId
    }
  })
}

export const delArticles = (userId) => {
  return request({
    url: `/v1_0/article/collections/${userId}`,
    method: 'DELETE'
  })
}
