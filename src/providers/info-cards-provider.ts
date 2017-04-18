import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the InfoCardsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class InfoCardsProvider {
    infoCards: any[];
    bookmarks: any[];
    bookmarkIds: string[];
    constructor(public http: Http, public storage: Storage) {
        this.bookmarks = [];
        this.bookmarkIds = [];
    }

    getInfoCards(){
        return new Promise((resolve, reject) => {
            this.infoCards = this.getDummyCards();
            resolve(this.infoCards);
        })
    }

    bookmark(id) {
        console.log(id);
        if(this.bookmarkIds.indexOf(id.toString()) === -1){
            return this.storage.ready().then(() => {
                return this.storage.set(id.toString(), true);
            })
        }
        else {
            return this.storage.ready()
            .then(() => {
                return this.storage.remove(id.toString());
            })
        }
    }

    getBookmarks() {
        if(!this.infoCards){
            return this.getInfoCards().then(() => {
                return this.getBookmarks();
            })
        }
        this.bookmarks = [];
        return this.storage.ready()
        .then(() => {
            return this.storage.keys().then((keys) => {
                keys.forEach((key) => {
                    let el =this.infoCards.find((card) => {
                        return card.id == key;
                    });
                    if(el) this.bookmarks.push(el);
                });
                return this.bookmarks;
            })
        })
    }

    setBookmarkIds() {
        return this.storage.ready()
        .then(() => {
            this.storage.keys()
            .then((keys) => {
                this.bookmarkIds = keys;
            })
        })
    }

    getDummyCards(){
        return [
            {
                id: 0,
                title: 'Card 1',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in nulla et metus commodo iaculis. Aliquam sollicitudin laoreet suscipit. Suspendisse sed nisl luctus, sagittis eros sed, hendrerit nibh. Pellentesque egestas finibus sem et hendrerit. Suspendisse convallis faucibus massa. Ut nibh dui, egestas eget cursus at, interdum in nisl. Fusce magna nisi, cursus ac fermentum ut, consequat ac orci.',
                content: `<p><strong>Lorem ipsum</strong> dolor sit amet, consectetur adipisicing elit. Officia dolores, quod dignissimos debitis excepturi quidem nostrum eaque, laboriosam explicabo est consequatur facere? Ratione modi atque, explicabo quisquam labore. Ex, rem?</p>
                            <p>Iusto optio quas dolore illum necessitatibus quia at libero labore, natus iure dicta, error molestias. Deleniti commodi harum quibusdam hic quaerat, voluptatem, deserunt enim quae reiciendis quidem praesentium nam laborum!</p>
                            <p>Deserunt quae <a href="#">laboriosam iure consectetur</a> quis, itaque dicta fuga nam, nisi ipsum, voluptatum in beatae porro sint doloribus perferendis ipsa cupiditate vitae et odio! Eveniet soluta at consequuntur consequatur officiis.</p>
                            <p>Laborum beatae facilis earum, ex ipsum, doloremque corporis maiores esse omnis dolorum voluptates molestias perferendis asperiores, error. Quod facere, ipsam deleniti tempore nostrum cumque iste aspernatur perspiciatis. Eligendi, dolor amet.</p>
                            <p><img src="http://1.bp.blogspot.com/-FlpE6jqIzQg/UmAq6fFgejI/AAAAAAAADko/ulj3pT0dIlg/s1600/best-nature-desktop-hd-wallpaper.jpg" /></p>
                            <p>
                                Aut aliquam, rerum quisquam explicabo et libero. Magnam, laboriosam! Et quod voluptatem quas labore, porro officiis, culpa cum nobis, numquam possimus voluptas in aspernatur incidunt non earum suscipit. Doloremque, velit!
                                <ul>
                                    <li>Hello</li>
                                    <li>From</li>
                                    <li>the</li>
                                    <li>Other</li>
                                </ul>

                            </p>`,
                category: 'Hipoteka',
                subcategory: 'Pasuri te patundshme',
            },
            {
                id: 1,
                title: 'Card 2',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in nulla et metus commodo iaculis. Aliquam sollicitudin laoreet suscipit. Suspendisse sed nisl luctus, sagittis eros sed, hendrerit nibh. Pellentesque egestas finibus sem et hendrerit. Suspendisse convallis faucibus massa. Ut nibh dui, egestas eget cursus at, interdum in nisl. Fusce magna nisi, cursus ac fermentum ut, consequat ac orci.',
                content: `<p><strong>Lorem ipsum</strong> dolor sit amet, consectetur adipisicing elit. Officia dolores, quod dignissimos debitis excepturi quidem nostrum eaque, laboriosam explicabo est consequatur facere? Ratione modi atque, explicabo quisquam labore. Ex, rem?</p>
                            <p>Iusto optio quas dolore illum necessitatibus quia at libero labore, natus iure dicta, error molestias. Deleniti commodi harum quibusdam hic quaerat, voluptatem, deserunt enim quae reiciendis quidem praesentium nam laborum!</p>
                            <p>Deserunt quae <a href="#">laboriosam iure consectetur</a> quis, itaque dicta fuga nam, nisi ipsum, voluptatum in beatae porro sint doloribus perferendis ipsa cupiditate vitae et odio! Eveniet soluta at consequuntur consequatur officiis.</p>
                            <p>Laborum beatae facilis earum, ex ipsum, doloremque corporis maiores esse omnis dolorum voluptates molestias perferendis asperiores, error. Quod facere, ipsam deleniti tempore nostrum cumque iste aspernatur perspiciatis. Eligendi, dolor amet.</p>
                            <p>
                                Aut aliquam, rerum quisquam explicabo et libero. Magnam, laboriosam! Et quod voluptatem quas labore, porro officiis, culpa cum nobis, numquam possimus voluptas in aspernatur incidunt non earum suscipit. Doloremque, velit!
                                <ul>
                                    <li>Hello</li>
                                    <li>From</li>
                                    <li>the</li>
                                    <li>Other</li>
                                </ul>

                            </p>`,
                category: 'Hipoteka',
                subcategory: 'Pasuri te patundshme',
            },
            {
                id: 2,
                title: 'Card 3',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in nulla et metus commodo iaculis. Aliquam sollicitudin laoreet suscipit. Suspendisse sed nisl luctus, sagittis eros sed, hendrerit nibh. Pellentesque egestas finibus sem et hendrerit. Suspendisse convallis faucibus massa. Ut nibh dui, egestas eget cursus at, interdum in nisl. Fusce magna nisi, cursus ac fermentum ut, consequat ac orci.',
                content: `<p><strong>Lorem ipsum</strong> dolor sit amet, consectetur adipisicing elit. Officia dolores, quod dignissimos debitis excepturi quidem nostrum eaque, laboriosam explicabo est consequatur facere? Ratione modi atque, explicabo quisquam labore. Ex, rem?</p>
                            <p>Iusto optio quas dolore illum necessitatibus quia at libero labore, natus iure dicta, error molestias. Deleniti commodi harum quibusdam hic quaerat, voluptatem, deserunt enim quae reiciendis quidem praesentium nam laborum!</p>
                            <p>Deserunt quae <a href="#">laboriosam iure consectetur</a> quis, itaque dicta fuga nam, nisi ipsum, voluptatum in beatae porro sint doloribus perferendis ipsa cupiditate vitae et odio! Eveniet soluta at consequuntur consequatur officiis.</p>
                            <p>Laborum beatae facilis earum, ex ipsum, doloremque corporis maiores esse omnis dolorum voluptates molestias perferendis asperiores, error. Quod facere, ipsam deleniti tempore nostrum cumque iste aspernatur perspiciatis. Eligendi, dolor amet.</p>
                            <p>
                                Aut aliquam, rerum quisquam explicabo et libero. Magnam, laboriosam! Et quod voluptatem quas labore, porro officiis, culpa cum nobis, numquam possimus voluptas in aspernatur incidunt non earum suscipit. Doloremque, velit!
                                <ul>
                                    <li>Hello</li>
                                    <li>From</li>
                                    <li>the</li>
                                    <li>Other</li>
                                </ul>

                            </p>`,
                category: 'Hipoteka',
                subcategory: 'Pasuri te patundshme',
            }
        ]
    }

}