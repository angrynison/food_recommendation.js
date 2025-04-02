import fetch from 'node-fetch';

export const getRecipe = async(ingredient) => {

    // 입력한 재료료 카테고리 선택  //ppt 6~7 분류라는 탭에 있는 데이터 categorypage에 저장 
    const categoryPage = await fetch(
        `https://www.10000recipe.com/recipe/list.html?q=${ingredient}`,
    ).then(rs => rs.text());
    //ppt 10~12 categories에 저장
    const categoryList = categoryPage.split('<ul class="tag_cont" style="overflow:hidden;">')[1]
                                     .split('</ul>')[0];
    const categories = categoryList.split('href');
    //ppt 14~18
    let categoryRnd = Math.floor(Math.random() * categories.length); // 요리가 랜덤으로 나오게 하는 부분
    if (categoryRnd === 0) categoryRnd = 1;
    const category = categories[categoryRnd].split('>')[1].split('</a')[0].trim();

    console.log(category);


    //ppt 22 ~ 23 선택된 카테고리로 요리 선택, 요리들을 가져온다
    const cookPage = await fetch(
        `https://www.10000recipe.com/recipe/list.html?q=${category}`,
    ).then(rs => rs.text());
    //ppt 26 ~ 28 필요한 값의 요리만 cooks에 저장 
    const cookList= cookPage.split('<ul class="common_sp_list_ul ea4" style="padding:0 0 0 8px;">')[1]
                            .split('</ul>')[0];
    const cooks = cookList.split('<li class="common_sp_list_li">');
    //ppt 30~ 34 사람마다 레시피가 다름 -> 여러가지 레시피를 위해 랜덤함수 이용 
    let cookRnd = Math.floor(Math.random() * cooks.length);
    if (cookRnd === 0) cookRnd = 1;
    const cook = cooks[cookRnd].split('<a href=')[1].split('class="common_sp_link">')[0].split('/')[2].split('"')[0].trim();

    console.log(cook)

    // ppt 36~ 요리 정보(요리재료,조리순서,레시피) 가져오는 거 // ppt 37~39 만개의 레시피 사이트에 있는 데이터 infopage에 저장 
    const infoPage = await fetch(
        `https://www.10000recipe.com/recipe/${cook}`,
    ).then(rs => rs.text());

    const title = infoPage.split('<title>')[1].split('</title>')[0].trim();    // 요리제목
    const img = infoPage.split('main_thumbs" src=')[1].split('alt')[0].split('"').join('').trim(); // 요리 이미지

    console.log(title)
    const sources = infoPage.split('<div class="cont_ingre2">')[1].split('<div class="blank_bottom"></div>')[0].split('<ul'); // sources에 재료 , 재료의 수량

    let sourcesList = [];
    for(var i = 1; i < sources.length; i ++){

        let sourceList = [];

        const sourceData = sources[i];
        const sourceTitle = sourceData.split('ready_ingre3_tt">')[1].split('<')[0].trim();

        for(var j = 1; j < sourceData.split('<li>').length; j ++){
            const name = sourceData.split('<li>')[j].split('<')[0].trim();
            const volume = sourceData.split('ingre_unit">')[j].split('<')[0].trim();
            sourceList.push({name: name, volume : volume});
        }

        sourcesList.push({
            title: sourceTitle,
            list: sourceList
        })
    }
    //ppt 67 조리 순서를 가져와서 recipes에 저장
    const recipes = infoPage.split('<div class="view_step">')[1].split('<div class="blank_bottom"></div>')[0].split('media-body">');

    let recipesList = [];
    for(var i = 1; i < recipes.length; i ++){
        const recipeData = recipes[i].split('</div>')[0].split('<')[0].trim();

        recipesList.push(`${i}. ${recipeData}`);
    }

    return {
        title : title,
        img, img,
        sourcesList : sourcesList,
        recipesList : recipesList
    }
}