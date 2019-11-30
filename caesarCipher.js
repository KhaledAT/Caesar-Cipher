// Khaled Tetbirt
// IFT-1015

// Ce programme presente deux fonctions globales (encoder et decoder)
// qui permettre de crypter une chaine de caractere selon le cryptage
// de cesar, un deplacement des lettre d'un certain nombre n (clef).


// La fonction rotation, qui indique le rang du charactere crypte
// a partir du rang du caractere initial et de la clef.

var rotation = function (rang,clef) {
    
    // Si la clef est un multiple entier de 26 ou -26, la lettre reste la meme,
    // ainsi que son rang.
    
    if ((Math.abs(clef)%26) == 0) {
        
        return(rang);
        
    }
    
    else {
        
        // Les regles qui suivent representent la gestion des cas speciaux ou le rang 
        // attendu est superieur au nombre de lettre (26). 
        //
    
        if (rang + clef >= 0 && rang + clef <= 25) {

            return(rang + clef);

        }

        else {
            
            // Dans les deux cas suivants, on utilise modulo de
            // 26 pour connaitre le nombre de rotation totale de 
            // 26 lettres, pour ne garder que le reste.	

            if (rang + clef < 0)  {

                return(26 + ((rang + clef)%26));

            }

            else {

                if (rang + clef > 25)  {

                    return((rang + clef)%26);

                }

            }

        }
        
    }
    
};

// La fonction lettre, qui indique le caractere crypte a partir du caractere
// initial et de la clef.

var lettre = function (lettre, clef) {
    
    // On cree deux alternatives afin de gerer les lettres majuscules
    // et minuscules.
    
    if ( (lettre.charAt(0)).toUpperCase() == lettre.charAt(0)){
        
        var alphabetMaj = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        var rang = alphabetMaj.indexOf(lettre);
        
        return(alphabetMaj.charAt(rotation(rang,clef)));
        
    }
    
    else {
        
        var alphabetMin = "abcdefghijklmnopqrstuvwxyz";
        
        var rang = alphabetMin.indexOf(lettre);
        
        return(alphabetMin.charAt(rotation(rang,clef)));
        
    }
    
};

var cesar = function (texte, clefMin, clefMaj) {
    
    // On initialise une variable textuelle vide, qu'on construira
    // a l'aide d'iterations qui ajoutent les caracteres decodes un
    // par un.
    
    var message = "";
    
    for (var i = 0 ; i < texte.length ; i++) {
        
        // On s'assure que les caracteres sont uniquement des lettres
        // majuscules ou minuscules.
        
        if( (texte.charAt(i) >= "\u0061" && texte.charAt(i) <= "\u007a") || (texte.charAt(i) >= "\u0041" && texte.charAt(i) <= "\u005a") ) {
            
             if ((texte.charAt(i)).toUpperCase() == texte.charAt(i)) {

                message = message + lettre(texte.charAt(i), clefMaj);

            }

            else {

                message = message + lettre(texte.charAt(i), clefMin);

            }
            
        }
        
        // Dans le cas ou le caractere n'est pas une lettre,
        // on ne fait que le rajouter lui meme, sans le coder.
        
        else {
            
            message = message + texte.charAt(i);
            
        }
        
    }
    
    return(message);
    
};

// Encoder utilise cesar avec la clef minuscule et majuscule pour encoder
// un message.

var encoder = function (textevierge, clefMin, clefMaj) {
    
    return(cesar(textevierge, clefMin, clefMaj));
    
};

// Decoder utilise cesar avec les valeurs negatives des cles minuscule
// et majuscule pour decoder un message.

var decoder = function (texteencode,clefMin, clefMaj) {
    
    return(cesar(texteencode, -clefMin,-clefMaj));
    
};

var testUnitaires = function () {
    
    assert ( rotation(9,3) == 12 );
    assert ( rotation(25,4) == 3);
    assert ( rotation(0,-13) == 13);

    assert( lettre("J",3) == "M" );
    assert( lettre("j",-26) == "j" );
    assert( lettre("z",3) == "c");
    
    assert( cesar("JULES CESAr!!! ",5,3) == "MXOHV FHVDw!!! " );
    assert( cesar("9@!",2,4) == "9@!" );
    assert( cesar("Allo",26,-26) == "Allo" );
    
    assert( encoder("allo",1,1) == "bmmp" );
    assert( encoder("9 @",1,1) == "9 @" );
    assert( encoder("ALLO",1,1) == "BMMP" );
    
    assert( decoder(encoder("allo",1,1),1,1) == "allo");
    assert( decoder(encoder("9 @",3,2),3,2) == "9 @");
    assert( decoder(encoder("ALLO",-26,26),-26,26) == "ALLO");
    
};

testUnitaires();
