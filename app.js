var app = angular.module('ipo-calculator', []);

app.controller('MainCtrl', function($scope) {
  
  $scope.hniMinInvestmentLimit=200000;
  $scope.daysInYear=365;
  $scope.loanInvestmentAmount=0;
  $scope.loanInterestRate=7;
  $scope.daysForCashRedemption=5;
  $scope.daysForListing=11;
  
  $scope.calculate=function() {
    $scope.sharesApplied=$scope.investmentAmount/$scope.issuePrice;
    if($scope.niiSubscription>1)
      $scope.sharesAllocated=Math.floor($scope.sharesApplied/$scope.niiSubscription);
    else
      $scope.sharesAllocated=$scope.sharesApplied;
    $scope.interestTillCashRedemption=$scope.loanInvestmentAmount*($scope.loanInterestRate*$scope.daysForCashRedemption/$scope.daysInYear)/100;
    $scope.interestTillListing=($scope.loanInvestmentAmount-(($scope.sharesApplied-$scope.sharesAllocated)*$scope.issuePrice))*($scope.loanInterestRate*($scope.daysForListing-$scope.daysForCashRedemption)/$scope.daysInYear)/100;
    if($scope.interestTillListing<0) {
      $scope.interestTillListing=0;
    }
    $scope.totalProfit=$scope.sharesAllocated*$scope.listingPrice-$scope.sharesAllocated*$scope.issuePrice-$scope.interestTillCashRedemption-$scope.interestTillListing;
  }
  
  $scope.changeSelect=function() {
    if($scope.selectMinValue===true) {
      $scope.minLotsToApply=Math.ceil($scope.hniMinInvestmentLimit/($scope.issuePrice*$scope.lotSize));
      $scope.minSharesApplied=$scope.minLotsToApply*$scope.lotSize;
      $scope.minInvestmentAmount=$scope.minSharesApplied*$scope.issuePrice;
      $scope.investmentAmount=$scope.minInvestmentAmount;
      $scope.loanInvestmentAmount=0;
      $scope.personalInvestmentAmount=$scope.investmentAmount;
    } else {
      $scope.investmentAmount="";
    }
  }
  
  $scope.calculateMinAmount=function() {
    $scope.minLotsToApply=Math.ceil($scope.hniMinInvestmentLimit/($scope.issuePrice*$scope.lotSize));
    $scope.minSharesApplied=$scope.minLotsToApply*$scope.lotSize;
    $scope.minInvestmentAmount=$scope.minSharesApplied*$scope.issuePrice;
  }
  
  $scope.investmentCalculation=function(field) {
    if(field==="loan") {
      $scope.personalInvestmentAmount=$scope.investmentAmount-$scope.loanInvestmentAmount;
    } else {
      $scope.loanInvestmentAmount=$scope.investmentAmount-$scope.personalInvestmentAmount;
    }
  }
});
