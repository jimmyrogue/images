/*
 * @Descripttion: 
 * @version: 
 * @Author: jimmy
 * @Date: 2020-12-07 14:35:27
 * @LastEditors: jimmy
 * @LastEditTime: 2020-12-09 15:20:20
 */
const fs = require('fs-extra')
const globby = require('globby')

const main = async () => {
	const paths_source = await globby([
		'assets/*.png',
		'assets/*.svg',
		'assets/*.jpg',
		'assets/*.jpeg',
		'assets/**/*.png',
		'assets/**/*.svg',
		'assets/**/*.jpg',
		'assets/**/*.jpeg',
	])
	const paths_target = []

	paths_source.map(item => paths_target.push(item.substr(7)))

	const html = fs.readFileSync('src/source.html').toString().replace(
		`
      <head>
            <title>PicPic</title>
      </head>
`,
		`
      <head>
            <title>PicPic</title>
            <script>
                  window.img_paths=${JSON.stringify(paths_target)}
                  window._com={}
            </script>
      </head>
`
	)

	if (!fs.existsSync('dist')) {
		fs.mkdirSync('dist')
	} else {
		fs.removeSync('dist')
		fs.mkdirSync('dist')
	}

	fs.writeFileSync('dist/index.html', html)
	fs.copySync('assets', 'dist')
	fs.copySync('src', 'dist')
	fs.removeSync('dist/source.html')
}

main()
