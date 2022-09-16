let ajaxTime = 0

export const request = (params) => {
  ajaxTime++
  wx.showLoading({
    title: "加载中",
    mask: true,
  });

  const baseUrl = "https://api.it120.cc/lsf1005"
  return new Promise((resolve, reject) => {
    var reqTask = wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => { reject(err) },
      complete: () => {
        ajaxTime--
        if (ajaxTime == 0) {
          wx.hideLoading();
        }
      }
    });
  })
}