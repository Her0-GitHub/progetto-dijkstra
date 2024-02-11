# Progetto Dijkstra

[English](./README-EN.md)
    
## Descrizione del Progetto
Il progetto mira a sviluppare un'applicazione software che implementa l'algoritmo di Dijkstra per determinare il cammino minimo tra due nodi in un grafo. L'app sarà progettata per essere intuitiva e user-friendly, con particolare attenzione all'interfaccia utente e alla presentazione chiara dell'output.

## Funzionalità Principali
1. **Input del Grafo:** Consentire all'utente di inserire o generare un grafo con nodi e pesi degli archi.
2. **Seleziona Nodi:** Permettere all'utente di selezionare due nodi di partenza e destinazione.
3. **Calcolo del Cammino Minimo:** Implementare l'algoritmo di Dijkstra per determinare il cammino minimo tra i nodi selezionati.
4. **Visualizzazione del Risultato:** Mostrare chiaramente il cammino minimo calcolato e la sua lunghezza.
5. **Interfaccia Utente Intuitiva:** Creare un'interfaccia chiara e facile da usare, con attenzione alla leggibilità e all'esperienza dell'utente.

### Bozza Interfaccia
Un'interfaccia molto pulita con vari bottoni disposti nei lati dello schermo per eseguire le varie funzioni presenti nel programma. [Esempio Nodi Grafo](https://her0-github.github.io/progetto-dijkstra/)

## Cotenuti Utilizzati
### 🔨 Strumenti
- [MagicPattern](https://www.magicpattern.design/tools/css-backgrounds)
- [GitHub Copilot](https://github.com/features/copilot)

### 📦 Librerie
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [Font Awesome](https://fontawesome.com/)

### 📚 Documentazione e Tutorial
- [Very Good Youtube Video](https://youtu.be/EFg3u_E6eHU)
- [Boostrap Docs](https://getbootstrap.com/docs)
- [Javascrpit Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [jQuery Docs](https://api.jquery.com/)

## Pseudocodice
```peudocode
Per ogni vertice v:
    Imposta la distanza di v a Infinito
    Imposta il vertice precedente di v a nessuno
    
Imposta la distanza della sorgente a 0
Imposta tutti i vertici come non esplorati

Mentre la destinazione non è esplorata:
    v = vertice non esplorato con il valore minore
    Imposta v come esplorato
    Per ogni bordo (v, w):
        Se la distanza di v + la lunghezza di (v, w) è minore della distanza di w:
            Imposta la distanza di w a distanza di v + lunghezza di (v,w)
            Imposta il vertice precedente di w a v
```
