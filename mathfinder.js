var app = angular.module('myApp', []);
app.controller('mathfinder', function($scope) {

    $scope.baseStr = 10;
    $scope.baseDex = 10;
    $scope.baseCon = 10;
    $scope.baseInt = 10;
    $scope.baseWis = 10;
    $scope.baseCha = 10;
    
    $scope.baseFort = 0;
    $scope.baseRefl = 0;
    $scope.baseWill = 0;
    
    $scope.level = 1;
    $scope.baseHP = 0;
    $scope.baseAC = 0;
    $scope.baseAttack1 = 0;
    $scope.baseAttack2 = 0;
    
    $scope.featAttack = 0;
    $scope.featDamage = 0;
    $scope.weaponName = "";
    $scope.weaponAttack = 0;
    $scope.weaponHitDice = "";
    $scope.weaponDamage = 0;
    $scope.weaponIsTwoHanded = false;
    
    
    
    $scope.modStr = 0;
    $scope.modDex = 0;
    $scope.modCon = 0;
    $scope.modInt = 0;
    $scope.modWis = 0;
    $scope.modCha = 0;
    
    $scope.modFort = 0;
    $scope.modRefl = 0;
    $scope.modWill = 0;
    
    $scope.damage = 0;
    $scope.healed = 0;
    
    $scope.haste = false;
    $scope.rage = false;
    $scope.fatigued = false;
    $scope.powerAttack = false;
    $scope.bless = false;
    $scope.bardSong = false;

    
    $scope.strength = function() {
        var tempStr = $scope.baseStr + $scope.modStr;
        if($scope.rage)
        {
            tempStr = tempStr + 4;
        }
        if($scope.fatigued)
        {
            tempStr = tempStr - 2;
        }
        return tempStr;
    };
    
    $scope.dexterity = function() {
        var tempDex = $scope.baseDex + $scope.modDex;
        if($scope.fatigued)
        {
            tempDex = tempDex - 2;
        }
        return tempDex;
    };
    
    $scope.constitution = function() {
        var tempCon = $scope.baseCon + $scope.modCon;
        if($scope.rage)
        {
            tempCon = tempCon + 4;
        }
        return tempCon;
    };
    
    $scope.intelligence = function() {
        var tempInt = $scope.baseInt + $scope.modInt;
        return tempInt;
    };
    
    $scope.wisdom = function() {
        var tempWis = $scope.baseWis + $scope.modWis;
        return tempWis;
    };
    
    $scope.charisma = function() {
        var tempCha = $scope.baseCha + $scope.modCha;
        return tempCha;
    };
    
    
    
    $scope.calculateModifier = function(attribute) {
        var modifier = (attribute - 10) / 2;
        modifier = Math.floor(modifier);
        return modifier;
    };
    
    $scope.displayModifier = function(attribute) {
        var modifier = this.calculateModifier(attribute);
        var display = modifier;
        if(modifier >= 0)
        {
            display = "+" + modifier;
        }
        return display;
    };
    
    
    $scope.fortitude = function() {
        var tempFort = $scope.baseFort + $scope.modFort;
        tempFort = tempFort + this.calculateModifier(this.constitution());
        return tempFort;
    };
    
    $scope.reflex = function() {
        var tempRefl = $scope.baseRefl + $scope.modRefl;
        tempRefl = tempRefl + this.calculateModifier(this.dexterity());
        if($scope.haste)
        {
            tempRefl = tempRefl + 1;
        }
        return tempRefl;
    };
    
    $scope.will = function() {
        var tempWill = $scope.baseWill + $scope.modWill;
        tempWill = tempWill + this.calculateModifier(this.wisdom());
        if($scope.rage)
        {
            tempWill = tempWill + 2;
        }
        return tempWill;
    };
    
    
    $scope.calculateHitPoints = function() {
      var totalHP = $scope.baseHP - $scope.damage + $scope.healed;
      totalHP = totalHP + ($scope.calculateModifier($scope.constitution()) * $scope.level) - ($scope.calculateModifier($scope.baseCon) * $scope.level);
      return totalHP;  
    };
    
    $scope.calculateAC = function() {
      var totalAC = $scope.baseAC;
      totalAC = totalAC - this.calculateModifier(this.baseDex) + this.calculateModifier(this.dexterity());
      if($scope.haste)
      {
          totalAC = totalAC + 1;
      }
      if($scope.rage)
      {
          totalAC = totalAC - 2;
      }
      return totalAC;
    };
    
    
    $scope.calculateWeaponAttack = function(baseAttackBonus) {
        var strengthBonus = $scope.calculateModifier($scope.strength());
        var tempWeaponAttack = $scope.weaponAttack + baseAttackBonus + strengthBonus + $scope.featAttack;
        if($scope.haste)
        {
            tempWeaponAttack = tempWeaponAttack + 1;
        }
        if($scope.powerAttack)
        {
            tempWeaponAttack = tempWeaponAttack - (1 * ((Math.floor($scope.baseAttack1 / 4)) + 1));
        }
        if($scope.bless)
        {
            tempWeaponAttack = tempWeaponAttack + 1;
        }
        return tempWeaponAttack;
    };
    
    $scope.calculateWeaponDamage = function(baseAttackBonus) {
        var tempWeaponDamage = $scope.weaponDamage + $scope.featDamage;
        var strengthBonus = $scope.calculateModifier($scope.strength());
        var powerAttackBonus = 0;
        if($scope.powerAttack)
        {
            powerAttackBonus = (2 * ((Math.floor($scope.baseAttack1 / 4)) + 1));
        }
        if($scope.weaponIsTwoHanded)
        {
            strengthBonus = Math.floor(strengthBonus * 1.5);
            powerAttackBonus = Math.floor(powerAttackBonus * 1.5);
        }
        tempWeaponDamage = tempWeaponDamage + strengthBonus + powerAttackBonus;
        return tempWeaponDamage;
    };
    
    
});

