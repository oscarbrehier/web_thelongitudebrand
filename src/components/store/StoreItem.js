export function StoreItem({ data }) {

    let image_url = `https://cdn.sanity.io/images/xgcgiqjg/production/${data.images[0].asset._ref.slice(6).replace('-png', '.png')}`

    return (

        <a href={`/shop/${data.slug.current}`}>

            <div className="w-full h-[30rem] bg-cream-200 p-4 flex flex-col">

                <div className="flex-1 w-full flex items-center">
                    <img src={image_url} alt="" />
                </div>

                <div>
                    <p className="text-xs uppercase">{data.title}</p>
                    <p className="text-xs font-medium">{data.price}€</p>
                </div>

            </div>
            
        </a>

    );

};