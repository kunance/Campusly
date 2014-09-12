// remove an element in-place
_.rm= function (arr,elm)
{
    var pos= _.indexOf(arr,elm);

    if (pos>-1)
      arr.splice(pos,1);
};
