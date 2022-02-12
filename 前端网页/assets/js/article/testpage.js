$(function() {
  var layer = layui.layer
  var form = layui.form

  initCate()
  // 初始化富文本编辑器
  initEditor()

  // 定义加载文章分类的方法
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('初始化文章分类失败！')
        }
        // 调用模板引擎，渲染分类的下拉菜单
        var htmlStr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlStr)
        // 一定要记得调用 form.render() 方法
        form.render()
      }
    })
  }


  
  

    // // 为选择电影的按钮，绑定点击事件处理函数
    $('#btnMovieImage').on('click', function() {
      $('#coverMovie').click()
    })
  
    // 监听 coverFile 的 change 事件，获取用户选择的文件列表
    $('#coverMovie').on('change', function(e) {
      // 获取到文件的列表数组
      var files = e.target.files
      // 判断用户是否选择了文件
      if (files.length === 0) {
        return
      }
      // 为裁剪区域重新设置图片
      $movie = files[0]
    })


  // 定义文章的发布状态
  var art_state = '已发布'
  var id_use = id
  console.log(id_use)
  // 为存为草稿按钮，绑定点击事件处理函数
  $('#btnSave2').on('click', function() {
    art_state = '草稿'
  })

  // 为表单绑定 submit 提交事件
  $('#form-pub').on('submit', function(e) {
    // 1. 阻止表单的默认提交行为
    e.preventDefault()
    // 2. 基于 form 表单，快速创建一个 FormData 对象
    var fd = new FormData($(this)[0])
    
    // 3. 将文章的发布状态，存到 fd 中
    fd.append('state', art_state)
    fd.append('id',id_use)
    fd.append('movie', $movie)
    publishArticle(fd)
  })

  // 定义一个发布文章的方法
  function publishArticle(fd) {
    $.ajax({
      method: 'POST',
      async : false,
      url: '/my/article/addmovie',
      data: fd,
      // 注意：如果向服务器提交的是 FormData 格式的数据，
      // 必须添加以下两个配置项
      contentType: false,
      processData: false,
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('上传电影基本信息失败！')
        }
        

        // 发布文章成功后，跳转到文章列表页面
        location.href = '../article/art_list.html'
      }
    })

  }
})
